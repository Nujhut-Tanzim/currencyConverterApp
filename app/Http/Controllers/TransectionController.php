<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Transection;
use App\Models\Message;
use Illuminate\Support\Facades\Mail;
use App\Mail\MessageMail;

class TransectionController extends Controller
{
    public function showForm()
    {
        return view('transactionPage');
    }

    public function processTransaction(Request $request)
    {
        $amount = $request->input('amountBDT');
        $account = $request->input('account_no');
        $name = $request->input('name');
        $email = $request->input('email');

        $data = Transection::create([
            'Account No:' => $account,
            'Name' => $name,
            'Email' => $email,
            'Amount' => $amount,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Transaction processed successfully!'
        ], 200);
    }

    public function sendMessage(Request $request)
    {

        $name = $request->input('name');
        $email = $request->input('email');
        $message1 = $request->input('message');


        $data = Message::create([
            'name' => $name,
            'email' => $email,
            'message' => $message1,
        ]);


        Mail::to('admin@gmail.com')->send(new MessageMail($name, $message1));

        return response()->json([
            'success' => true,
            'message' => 'Send mail successfully!'
        ], 200);
    }
}
