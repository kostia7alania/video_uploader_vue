


<?php
    function browserParse() {
        $browser = new Wolfcast\BrowserDetection();
        $userAgent       = $browser->getUserAgent();               //string
        $browserName     = $browser->getName();                    //string
        $browserVer      = $browser->getVersion();                 //string
        $platformFamily  = $browser->getPlatform();                //string
        $platformVer     = $browser->getPlatformVersion(true);     //string
        $platformName    = $browser->getPlatformVersion();         //string
        $platformIs64bit = $browser->is64bitPlatform();            //boolean
        $isMobile        = $browser->isMobile();                   //boolean
        $isRobot         = $browser->isRobot();                    //boolean
        $isInIECompat    = $browser->isInIECompatibilityView();    //boolean
        $strEmulatedIE   = $browser->getIECompatibilityView();     //string
        $arrayEmulatedIE = $browser->getIECompatibilityView(true); //array('browser' => '', 'version' => '')
        $isChromeFrame   = $browser->isChromeFrame();              //boolean
        return htmlspecialchars(json_encode([
            "userAgent"=>$userAgent,
            "browserName"=>$browserName,
            "browserVer"=>$browserVer,
            "platformFamily"=>$platformFamily,
            "platformVer"=>$platformVer,
            "platformName"=>$platformName,
            "platformIs64bit"=>$platformIs64bit,
            "isMobile"=>$isMobile,
            "isRobot"=>$isRobot,
            "isInIECompat"=>$isInIECompat,
            "strEmulatedIE"=>$strEmulatedIE,
            "arrayEmulatedIE"=>$arrayEmulatedIE,
            "isChromeFrame"=>$isChromeFrame,
        ]));
    }
?>