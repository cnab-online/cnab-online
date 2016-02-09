<?php

namespace CnabOnline\Entities;

/**
 * @Entity(repositoryClass="CnabOnline\Repositories\FileRepository")
 * @Table(name="files", indexes={
 *   @Index(name="uid_idx", columns={"uid"}),
 *   @Index(name="signature_idx", columns={"signature"}),
 * })
 **/
class File
{
	/** @Id @Column(type="integer") @GeneratedValue **/
    protected $id;

    /** @Column(type="string") **/
    protected $name;

    /** @Column(type="string") **/
    protected $uid;

    /** @Column(type="string") **/
    protected $signature;

    /** @Column(type="text") **/
    protected $text;

    /** @Column(type="datetime") **/
    protected $createdAt;

    /** @Column(type="datetime") **/
    protected $updatedAt;

    /**
     * @var \Cnab\Retorno\IArquivo
     */
    protected $cnabInstance;

    public function getId()
    {
    	return $this->id;
    }

    public function getName()
    {
    	return $this->name;
    }

    public function getText()
    {
    	return $this->text;
    }

    public function getCreatedAt()
    {
    	return $this->createdAt;
    }

    public function getUpdatedAt()
    {
    	return $this->updatedAt;
    }

    public function getSignature()
    {
        return $this->signature;
    }

    public function getUid()
    {
        return $this->uid;
    }

    /**
     * @return \Cnab\Retorno\IArquivo
     */
    public function getCnabInstance()
    {
        return $this->cnabInstance;
    }

    public function setName($value)
    {
    	return $this->name = $value;
    }

    public function setText($value)
    {
    	return $this->text = $value;
    }

    public function setCreatedAt(\Datetime $value)
    {
    	return $this->createdAt = $value;
    }

    public function setUpdatedAt(\Datetime $value)
    {
    	return $this->updatedAt = $value;
    }

    public function setSignature($value)
    {
        return $this->signature = $value;
    }

    public function setUid($value)
    {
        return $this->uid = $value;
    }

    /**
     * @param \Cnab\Retorno\IArquivo $value
     */
    public function setCnabInstance($value)
    {
        return $this->cnabInstance = $value;
    }
    


}