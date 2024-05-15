<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Note;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class NoteController extends Controller
{
    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $user = $request->user();

        try {
            $data = $request->all();
            $rules = [
                'note' => 'required|array',
                'title' => 'required|string',
            ];
            $validator = Validator::make($data, $rules);
            if ($validator->passes()) {
                $data = array_merge($validator->validated(), ['user_id' => $user->id]);

                $note = Note::create($data);
                $notes = Note::where('user_id', $user->id)->get(['note', 'updated_at', 'id', 'title']);

                return Inertia::render('Dashboard', [
                    'notification' => [
                        'type' => 'success',
                        'message' => 'Note Created Successfully',
                        'open' => true,
                    ],
                    'notes' => $notes,
                    'active_note' => $note->id,
                ]);
            } else {
                //TODO Handle your error
                throw ValidationException::withMessages($validator->errors()->all());
            }

        } catch (\Exception $e) {
            $notes = Note::where('user_id', $user->id)->get(['note', 'updated_at', 'id', 'title']);

            return Inertia::render('Dashboard', ['notification' => [
                'type' => 'error',
                'message' => $e->getMessage(),
                'open' => true,
            ],
                'notes' => $notes,
                'active_note' => null, ], 400);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request)
    {
        $user = $request->user();
        $notes = Note::where('user_id', $user->id)->get(['note', 'updated_at', 'id', 'title']);

        return Inertia::render('Dashboard', [
            'notification' => [
                'type' => 'success',
                'message' => '',
                'open' => false,
            ],
            'notes' => $notes,
            'active_note' => null,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(int $noteId, Request $request)
    {
        $user = $request->user();
        $note = Note::where('id', $noteId)->where('user_id', $user->id)->first();
        if (! $note) {
            $notes = Note::where('user_id', $user->id)->get(['note', 'updated_at', 'id', 'title']);

            return Inertia::render('Dashboard', [
                'notification' => [
                    'type' => 'failed',
                    'message' => 'Note does not belong to logged in user',
                    'open' => true,
                ],
                'notes' => $notes,
                'active_note' => null,
            ]);
        }

        $validated = $request->validate([
            'note' => 'required|array',
            'title' => 'required|string',
        ]);
        error_log(json_encode($note));
        error_log(json_encode($validated));
        $note->update([
            'note' => $validated['note'],
            'title' => $validated['title'],
        ]);

        $notes = Note::where('user_id', $user->id)->get(['note', 'updated_at', 'id', 'title']);

        return Inertia::render('Dashboard', [
            'notification' => [
                'type' => 'success',
                'message' => 'Note Successfully Updated',
                'open' => true,
            ],
            'notes' => $notes,
            'active_note' => null,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Note $note)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Note $note)
    {
        //
    }
}
