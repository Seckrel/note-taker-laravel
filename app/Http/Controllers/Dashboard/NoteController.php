<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Note;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NoteController extends Controller
{
    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $user = $request->user();
        $notes = Note::where('user_id', $user->id)->get(['note', 'updated_at', 'id']);

        return Inertia::render('Dashboard', [
            'notes' => $notes,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $user = $request->user();
            $data = [
                'user_id' => $user->id,
                'note' => $request->json()->all(),
            ];

            $note = Note::create($data);

            error_log('here');

            return response([
                'message' => 'Note Created',
                'note' => $note,
            ], 201);
        } catch (\Exception $e) {
            error_log($e);

            return response(['message' => $e->getMessage()], 400);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Note $note)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Note $note)
    {
        //
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
