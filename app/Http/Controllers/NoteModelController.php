<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreNoteModelRequest;
use App\Http\Requests\UpdateNoteModelRequest;
use App\Models\NoteModel;

class NoteModelController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreNoteModelRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(NoteModel $noteModel)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(NoteModel $noteModel)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateNoteModelRequest $request, NoteModel $noteModel)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(NoteModel $noteModel)
    {
        //
    }
}
