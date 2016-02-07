<?php
require_once __DIR__ . '/vendor/autoload.php';

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Silex\Application;

$app = new Silex\Application();

    
        
            

$app->POST('/file', function(Application $app, Request $request) {
            
            $file = $request->get('file');    
            return new Response('How about implementing filePost as a POST method ?');
            });

            

$app->GET('/file/{fileId}', function(Application $app, Request $request, $file_id) {
            
            
            return new Response('How about implementing fileFileIdGet as a GET method ?');
            });

            

$app->GET('/file/{fileId}/lines', function(Application $app, Request $request, $file_id) {
            
            
            return new Response('How about implementing fileFileIdLinesGet as a GET method ?');
            });

            

$app->GET('/file/{fileId}/occurrences', function(Application $app, Request $request, $file_id) {
            
            
            return new Response('How about implementing fileFileIdOccurrencesGet as a GET method ?');
            });

            
        
    

$app->run();
