<?php

namespace CnabOnline\Services;

use Exception;
use Silex\Application;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Negotiator\Parser;
use League\Fractal;
use League\Fractal\Manager;

class ResponseService
{
    /**
     * Create response object
     *
     * @var mixed $responseContent
     * @var \Symfony\Component\HttpFoundation\Request $request
     * @var \Silex\Application $app
     *
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function createResponse($responseContent, Request $request, Application $app)
    {
        /*
        $negotiator = new Parser([
            'accept-charset' => $request->headers->get('Accept-Charset'),
            'accept' => $request->headers->get('Accept'),
            'accept-language' => $request->headers->get('Accept-Language'),
            'accept-encoding' => $request->headers->get('Accept-Encoding'),
        ]);
        */

        if($responseContent instanceof Fractal\Resource\ResourceAbstract) {
            $responseContent = $app['fractal']->createData($responseContent)->toArray();
        }

        return new JsonResponse($responseContent);
    }

    /**
     * Convert exception to array
     *
     * @var Exception $exception
     * @var \Silex\Application $app
     *
     * @return array
     */
    public function convertExceptionResponse(Exception $exception, Application $app)
    {
        $title = 'Internal error';
        $detail = $app['debug'] ? $exception->getMessage() : null;
        if($exception instanceof \Symfony\Component\HttpKernel\Exception\HttpException) {
            if( $exception->getStatusCode() < 500 || $app['debug'] ) {
                $title = isset(Response::$statusTexts[$exception->getStatusCode()])
                    ? Response::$statusTexts[$exception->getStatusCode()]
                    : 'unknown status';
            }

        }
        $error = [
            'title' => $title,
            'detail' => $detail,
        ];
        if($app['debug']) {
            $error['trace'] = $exception->getTraceAsString();
        }
        return [
            'errors' => array(
                $error
            )
        ];
    }
}