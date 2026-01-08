<?php

namespace App\Helpers;

use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Storage;

class Helpers
{
    public static function formatDate($date, $format = 'Y-m-d H:i:s')
    {
        return date($format, strtotime($date));
    }

    public static function generateRandomString($length = 10)
    {
        return substr(str_shuffle(str_repeat($x = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', ceil($length / strlen($x)))), 1, $length);
    }

    private function hashFile($stringFile)
    {
        $encryptedString = Crypt::encryptString($stringFile);
        $base64Encoded = base64_encode($encryptedString);
        $safeString = preg_replace('/[^a-zA-Z0-9]/', '', $base64Encoded);
        $desiredLength = 10;
        $finalString = substr($safeString, 0, $desiredLength);

        return $finalString;
    }

    public function fileUploadHandling($requestFile, $prefixName, $path, $typeUpload, $fileOld = null)
    {
        $file = $requestFile;


        if ($typeUpload == "update") {
            $storage = Storage::disk('public');
            $fileOld = $path . "/" . $fileOld;
            if ($storage->exists($path . '/' . $fileOld)) {
                $storage->delete($path . '/' . $fileOld);
            }
        }

        $fileName = $prefixName . "_" . $this->hashFile($file->getClientOriginalName()) . "_" . time() . "." . $file->getClientOriginalExtension();
        $file->storeAs($path, $fileName, "public");

        return $fileName;
    }
}
