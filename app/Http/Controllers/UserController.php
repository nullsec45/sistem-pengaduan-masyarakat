<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::paginate(10);


        return Inertia::render('Dashboard/Users/Index', ['users' => $users]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Dashboard/Users/CreateUser');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(UserRequest $request)
    {
        DB::beginTransaction();
        try {
            // dd($request);`
            User::create([
                'name' => $request->name,
                'email' => $request->email,
                'username' => $request->username,
                'phone_number' => $request->phone_number,
                'password' => Hash::make($request->password),
            ]);

            DB::commit();

            // event(new Registered($user));


            return redirect()->route('dashboard.users.index');
        } catch (\Throwable $err) {
            DB::rollBack();

            return back()
                ->withInput()
                ->withErrors([
                    'error' =>   $err->getMessage()
                ]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id) {}

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $user = User::find($id);


        return Inertia::render('Dashboard/Users/EditUser', ['user' => $user]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UserRequest $request, string $id)
    {
        DB::beginTransaction();
        try {
            $user = User::find($id);

            $user->name = $request->name;
            $user->email = $request->email;
            $user->username = $request->username;
            $user->phone_number = $request->phone_number;

            if ($request->password) {
                $user->password = Hash::make($request->password);
            }

            $user->save();

            DB::commit();


            return redirect()->route('dashboard.users.index');
        } catch (\Throwable $err) {
            DB::rollBack();

            return back()
                ->withInput()
                ->withErrors([
                    'error' =>   $err->getMessage()
                ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
