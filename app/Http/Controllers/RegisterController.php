<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Api\BaseController as BaseController;
use Validator;

class RegisterController extends Controller
{
    public function userRegister(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email',
            'password' => 'required',
            'c_password' => 'required|same:password',
        ]);

        if($validator->fails()){
            return response()->json(['error' => $validator->errors()->all()]);
            // return $this->sendError('Validation Error.', $validator->errors());
        }
        $input = $request->all();

        $input['password'] = bcrypt($input['password']);
        $user = User::create($input);
        $success['token'] =  $user->createToken($input['password'].'901')->accessToken;
        $success['name'] =  $user->name;
        $success['message'] =  "User register successfully";
        return response()->json($success, 200);

    }
}
