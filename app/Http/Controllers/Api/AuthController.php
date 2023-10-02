<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\SignupRequest;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rules\Password;

class AuthController extends Controller
{
    /*
     *Register New user and After register,user will be login.
     */
    public function signup(Request $request)
    {
        $validator= Validator::make($request->all(),[
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', 'unique:users,email'],
            'password' => [
                'required',
                'confirmed',
                Password::min(8)
                ->letters()
                ->symbols()
                ->numbers()
            ]
        ]);

        if($validator->fails()) {
           return $response['response'] = $validator->messages();
        }
        $data = $request->all();
        /** @var \App\Models\User $user */
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
        ]);

        $token = $user->createToken("$user->name")->plainTextToken;
        return response(compact('user', 'token'));
    }

    /*
     * Login user.create Token
    */

    public function login(Request $request){
        $validator = Validator::make($request->all(),[
            'email' => 'required','email',
            'password' =>'required'

        ]);

        if($validator->fails()) {
           return $response['response'] = $validator->messages();
        }
        $credentials = $request->all();
        /** @var \App\Models\User $user */
        if(!Auth::attempt( $credentials)) {
          return response([
            'message'=>'Provided Email Address or Password is incorrect'
          ]);
        }
        $user = Auth::user();
        $token = $user->createToken("$user->name")->plainTextToken;
        return response(compact('user', 'token'));
    }

    /**
     * Logout User.Remove token
    */

     public function logout(Request $request){
        /** @var User $user */
        $user = $request->user();
        $user->currentAccessToken()->delete();
        return response('',204);
     }
}
