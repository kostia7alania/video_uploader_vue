<?php  
  //require('./video-config.php');
  $codes  = new DOMDocument( );
  $xml    = new DOMDocument( );
  $xsl    = new DOMDocument( );
  $xslt   = new XSLTProcessor( );
  $soap_params = ['soap_version' => SOAP_1_2];
  $soap_header = new SoapHeader(
      'http://www.contoso.com/'
    , 'Credentials'
    , array( 'AuthUserName' => vid_cfg['AuthUserName']
           , 'AuthPassword' => vid_cfg['AuthPassword']
  ) );
  $soap_service = new SoapClient( vid_cfg['soapServer'] . '?WSDL', $soap_params );
  $soap_service->__setSoapHeaders( $soap_header );  