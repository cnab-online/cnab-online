<?php
namespace Tests\Endpoints;

use Tests\TestCase;

use Symfony\Component\HttpFoundation\File\UploadedFile;

class FileEndpointTest extends TestCase
{
    public function testGetFilesReceiveMethodNotAllowed()
    {
        $client = $this->createClient();

        $client->request('GET', '/file');

        $this->assertEquals(
            405,
            $client->getResponse()->getStatusCode(),
            'Method not allowed'
        );
    }

    public function testPostInvalidFileUnprocessableEntity()
    {
        $client = $this->createClient();

        $file = new UploadedFile(
            $this->getFixturePath().'/invalid-file.ret',
            'valid-file.ret',
            'text/plain',
            123
        );

        $client->request(
            'POST',
            '/file',
            array(),
            array('file' => $file)
        );

        $this->assertEquals(
            422,
            $client->getResponse()->getStatusCode(),
            'Unprocessable Entity'
        );
    }

    public function testPostInvalidExtensionReceiveBadRequest()
    {
        $client = $this->createClient();

        $file = new UploadedFile(
            $this->getFixturePath().'/invalid-file.ret',
            'valid-file.doc',
            'text/plain',
            123
        );

        $client->request(
            'POST',
            '/file',
            array(),
            array('file' => $file)
        );

        $this->assertEquals(
            400,
            $client->getResponse()->getStatusCode(),
            'Bad request (Invalid file)'
        );
    }

    public function testPostValidFileReceiveOk()
    {
        $client = $this->createClient();

        $file = new UploadedFile(
            $this->getFixturePath().'/valid-file.ret',
            'valid-file.ret',
            'text/plain',
            123
        );

        $client->request(
            'POST',
            '/file',
            array(),
            array('file' => $file)
        );

        $this->assertEquals(
            200,
            $client->getResponse()->getStatusCode(),
            'OK'
        );

        $jsonResponse = json_decode($client->getResponse()->getContent());

        $this->assertFileResponse($client);

        return $jsonResponse->data->id;
    }

    public function assertFileResponse($client)
    {
        $jsonResponse = json_decode($client->getResponse()->getContent());

        $this->assertNotEmpty($jsonResponse->data);
        $this->assertNotEmpty($jsonResponse->data->type);
        $this->assertNotEmpty($jsonResponse->data->id);
        $this->assertNotEmpty($jsonResponse->data->attributes->name);
        $this->assertNotEmpty($jsonResponse->data->attributes->bank_name);
        $this->assertNotEmpty($jsonResponse->data->attributes->bank_code);
        $this->assertNotEmpty($jsonResponse->data->attributes->company_name);
        $this->assertNotEmpty($jsonResponse->data->attributes->generation_date);
    }

    public function testGetFile()
    {
        $fileUid = $this->testPostValidFileReceiveOk();

        $client = $this->createClient();

        $client->request('GET', '/file/'.$fileUid);

        $this->assertFileResponse($client);
    }

    public function testGetFileOccurrences()
    {
        $fileUid = $this->testPostValidFileReceiveOk();

        $client = $this->createClient();

        $client->request('GET', '/file/'.$fileUid.'/occurrences');

        $jsonResponse = json_decode($client->getResponse()->getContent());

        $this->assertNotEmpty($jsonResponse);

        $this->assertNotEmpty($jsonResponse->data);

        $this->assertTrue(is_array($jsonResponse->data));
    }

    public function testGetFileLines()
    {
        $fileUid = $this->testPostValidFileReceiveOk();

        $client = $this->createClient();

        $client->request('GET', '/file/'.$fileUid.'/lines');

        $jsonResponse = json_decode($client->getResponse()->getContent());

        $this->assertNotEmpty($jsonResponse);

        $this->assertNotEmpty($jsonResponse->data);

        $this->assertTrue(is_array($jsonResponse->data));
    }
}