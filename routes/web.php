<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TransectionController;
use Illuminate\Support\Facades\Mail;

Route::get('/index', function () {
    return view('index');
})->name('index');

// route

Route::get('/showForm', [TransectionController::class, 'showForm'])->name('showForm');

Route::post('/create-transaction',[TransectionController::class,"processTransaction"]);
Route::post('/send-message',[TransectionController::class,"sendMessage"]);

Route::get('/test-email', function () {
    try {
        Mail::raw('This is a test email', function ($message) {
            $message->to('nujhattanzimayshi@gmail.com')
                    ->subject('Test Email');
        });
        return 'Test email sent successfully.';
    } catch (\Exception $e) {
        return 'Failed to send test email: ' . $e->getMessage();
    }
});

