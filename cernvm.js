<script src="/static/js/vendor/jquery.knob.js"></script>
<script src="http://cernvm.cern.ch/releases/webapi/js/cvmwebapi-2.0.8.js"></script>
<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/galleria/1.2.9/galleria.min.js"></script>
<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/galleria/1.2.9/themes/classic/galleria.classic.css">
<script src="//cdnjs.cloudflare.com/ajax/libs/modernizr/2.6.2/modernizr.min.js"></script>
<style>
    #galleria {width: 400px; height: 400px; background: #000}
    label { font-size:24px; }
</style>
<div class="row-fluid">
    <div class="span12">
        <div id="info-box" class="alert alert-info fade in hide">
            <button type="button" class="close" data-dismiss="alert">&#xd7;</button>
            <span id="info-body">Message</span>
        </div>
        <div id="alert-box" class="alert fade in hide">
            <button type="button" class="close" data-dismiss="alert">&#xd7;</button>
            <strong>An error occured!</strong> <span id="alert-body">Message</span>
        </div>
        <div id="confirm-box" class="alert alert-block alert-error fade in hide">
            <h4 id="confirm-head" class="alert-heading">Your action is needed</h4>
            <p id="confirm-body">Message</p>
            <p>
            <a id="confirm-accept" class="btn btn-danger" href="#">Continue</a>
            <a id="confirm-abort" class="btn" href="#">Cancel</a>
            </p>
        </div>
    </div>
</div>
<div class="row-fluid">
    <div class="span12">
        <!-- CernVM plugin -->
        <embed type="application/x-cvmweb" id="cvmweb" style="width:1px; height:1px;">
        <!-- Section for configuring the VM: number of CPUs, RAM memory and Disk -->
        <div id="vm-config">
            <h1 class="newSession"><i class="icon-wrench"></i> Step 1 of 2: <small>Configuring the Virtual Machine</small></h1>
            <p class="newSession">In this step you can decide how much of your resources you want to share with the project. <a href="#" class="btn btn-primary create-vm disabled">Create Virtual Machine <i class="icon-chevron-right"></i></a></p>
            <!-- recoverSession -->
            <h1 class="recoverSession" style="display:none"><i class="icon-undo"></i> Step 1 of 2: <small>Restore the Virtual Machine</small></h1>
            <p class="recoverSession" style="display:none"><button type="button" data-loading-text="Restoring session..." class="btn btn-primary create-vm disabled">Restore the Virtual Machine <i class="icon-chevron-right"></i></button></p>

            <hr>
            <div class="row newSession">
                <div class="span4" style="text-align:center;">
                <label for="cpus">Nº CPUs</label>
                <input type="text" class="dial" data-min="0" data-max="4" data-width="150" value="1" id="cpus">
                </div>
                <div class="span4" style="text-align:center;">
                <label for="ram">RAM MB</label>
                <input type="text" class="dial" data-min="0" data-max="1024" data-width="150" data-step="32" value="256" id="ram">
                </div>
                <div class="span4" style="text-align:center;">
                <label for="disk">Disk MB</label>
                <input type="text" class="dial" data-min="0" data-max="2048" data-width="150" data-step="32" value="1024" id="disk">
                </div>
            </div>
        </div> <!-- End of VM configuration-->
        <!-- Section to show the progress of the creation of the VM -->
        <div id="prg-container" style="display:none;">
            <div class="alert alert-info">
                <i class="icon-refresh icon-spin"></i> <strong><span id="msg">action</span></strong> This may take a while, please, be patient. 
            </div>
            <div class="progress progress-striped active">
                <div id="progress" class="bar bar-info" style="width:0%"></div>
            </div>
        </div>
        <!-- End section progress -->
        <!-- Section for controlling the VM: play, pause, stop and clean -->
        <div id="vm-controls" style="display:none; padding-bottom: 5px; padding-top:5px;">
            <h1><i class="icon-dashboard"></i> Step 2 of 2: <small>Control the Virtual Machine</small></h1>
            <div class="row-fluid">
                <div class="span9">
                    <p><strong>Click in the Play button to start contributing</strong></p>
                    <p><span class="label label-info"><i class="icon-bullhorn"></i> Note</span> You can start, pause, stop or even remove the virtual machine from your computer.</p> 
                    <div id="advance-btn" class="btn-group" style="padding-top:5px; padding-bottom:5px;display:none;">
                        <a href="#" id="rdpURL" class="btn btn-inverse"><i class="icon-eye-open"></i> Open Virtual Machine RDP window</a>
                        <a href="#" id="logs" class="btn btn-inverse disabled"><i class="icon-cogs"></i> Open Virtual Machine Logs</a>
                    </div>
                    <div class="btn-group" style="margin-left:0px;">
                        <button id="play" class="btn"><i class="icon-play"></i> Play</button>
                        <button id="pause" class="btn"><i class="icon-pause"></i> Pause</button>
                        <button id="stop" class="btn"><i class="icon-stop"></i> Stop</button>
                        <button id="clean" class="btn"><i class="icon-trash"></i> Clean</button>
                    </div>
                    <br/>
                    <button id="advance" type="button" class="btn" data-toggle="button"><i class="icon-check-empty"></i> Show advance options</button>
                </div>
                <div id="timerContainer" class="span3 img-polaroid" style="text-align:center; display:none">
                    <label for="timer" style="font-size:12px;">Remaining time to update the figures</label>
                    <input id="timer" type="text" class="dial" data-width="100" data-height="100" data-min="0" data-max="150" value="150" data-readOnly="true" data-displayInput="false"></input>
                    <div style="text-align:center">
                    <button id="refresh" class="btn"><i class="icon-refresh"></i> Update Now</button>
                    </div>
                </div>
            </div>
        </div><!-- End of VM Controls -->
    </div>
</div>

<div class="row-fluid">
    <div class="span12">
        <div id="apiLoading" class="alert alert-info" style="display:none;">
            <i class="icon-refresh icon-spin"></i> <strong>Info:</strong> Enabling Advance Options to control the Virtual Machine...
            <!-- Dial to show the count down to next update -->
        </div>
        <div id="jobLoading" class="alert alert-warning" style="display:none;">
            <i class="icon-refresh icon-spin"></i> <strong>Info:</strong> Your Virtual Machine is being prepared to run jobs...
            <!-- Dial to show the count down to next update -->
        </div>
    </div>
</div>

<div class="row" id="simulationContainer" style="display:none">
    <hr>
    <h2><i class="icon-dashboard"></i> Virtual Machine output: <small>Simulation details and figures computed by you</small></h2>
    <div id="info" class="span4 well well-small" style="display:none;">
        <div id="sim"></div>
        <!--<div id="logs" style="display:none"></div>-->
    </div>
    <div id="galleria" class="span6" style="display:none"></div>
</div>

<script>
    $(document).ready(function(){
        $(".create-vm").removeClass("disabled");
        // First check if the user already created a session before
        if (Modernizr.localstorage) {
            if (localStorage.getItem("cernvmSession") != null) {
                console.log("There is a previous session");
                $(".recoverSession").show();
                $(".newSession").hide();
            }

            // enable dials
            $(".dial").knob({
               'fgColor': '#8bbf36',
               'inputColor': '#8bbf36',
               'thickness': .2,
            });

            /**
             * Handle all errors with a unified global function
             */
            function progressEvent(value, msg) {
                console.log(msg + ": " + value);
                //if (msg == 'Extracting compressed disk') {
                //    $("#extracting").show();
                //}
                //if (msg == 'Attaching hard disk') {
                //    $("#extracting").hide();
                //}
                $("#msg").text(msg + ": " + String(value) + "%");
                $("#progress").css("width", value +"%");
                if ((msg == 'Downloading VM Disk') && (value == 100)) {
                    $("#msg").text("Unzipping Virtual Machine");
                    $("#progress").css("width", "85%");
                }
            };

            function showProgressBar(){
                $("#prg-container").show();
                $("#vm-config").hide();
            }

            function hideProgressBar(){
                $("#prg-container").hide();
            }

            CVM.startCVMWebAPI(function(api){
                    
                var session = undefined;
                var intervalId = -1;
                var timerId = -1;
                var timerValue = 150; // seconds
                var pollingTime = timerValue * 1000; // miliseconds

                function timer(){
                    var current_value = $("#timer").val();
                    // Remove one minute
                    if (current_value <= 0) {
                        $("#timer").val(String(timerValue)).trigger('change');
                    }
                    else {
                        $("#timer").val(String(current_value - 1)).trigger('change');
                    }
                }

                $("#refresh").off('click').on('click', function(){
                    // Clear previous intervals
                    showFigures(session.apiURL);
                    clearInterval(intervalId);
                    clearInterval(timerId);
                    // Start new ones
                    intervalId = setInterval(function(){showFigures(session.apiURL)}, pollingTime);
                    $("#timer").val(timerValue).trigger('change');
                    timerId = setInterval(function(){timer();}, 1000);
                });

                $("#rdpURL").off('click').on('click', function(){
                    session.openRDPWindow();
                });

                $("#advance").off('click').on('click', function(){
                    $("#advance-btn").toggle();
                    if ($("#advance").hasClass('btn active')) {
                        $("#advance").html('<i class="icon-check-empty"></i> Show advance options');
                    }
                    else {
                        $("#advance").html('<i class="icon-check"></i> Hide advance options');
                    }
                });

                function session_requested(sessionObject) {
                    console.log("Session requested");
                    // Save that the user has successfully created a session
                    localStorage.setItem("cernvmSession", true);
                    $("#session").hide();
                    session = sessionObject;
                    console.log(session.state);
                    if (session.state == 2) {
                        //$("#rdpURL").attr("href", "rdp://" + session.rdpURL);
                        $("#play").click();
                    }
                    if (session.state == 4) {
                        //$("#rdpURL").attr("href", "rdp://" + session.rdpURL);
                        $("#play").addClass("active");
                        $("#apiLoading").show();
                    }
                    if (session.state == 6) {
                        //$("#rdpURL").attr("href", "rdp://" + session.rdpURL);
                        $("#pause").addClass("active");
                        $("#stop").addClass("disabled");
                    }
                    $("#vm-controls").show();

                    // Bind Events
                    session.addEventListener('progressBegin', function(){
                        $("#prg-container").show();
                        $("#progress").css("width", "0%");
                    });
                    session.addEventListener('progressEnd', function(){
                        $("#prg-container").hide();
                    });

                    session.addEventListener('open', function(){
                        //$("#rdpURL").attr("href", "rdp://" + session.rdpURL);
                        $("#vm-controls").show();
                        //$("#play").click();
                        $("#play").removeClass("active");
                        $("#pause").removeClass("active");
                        $("#stop").removeClass("disabled");
                        $("#prg-container").hide();
                        $("#simulationContainer").hide();
                        $("#apiLoading").hide();
                        $("#timerContainer").hide();
                    });

                    session.addEventListener('openError', function(data, err){
                        console.log(data);
                        console.log(err);
                    });
                    // Session State Change
                    session.addEventListener('sessionStateChange', function(state){
                        if (state == 2) {
                            $("#stop").html('<i class="icon-stop"></i> Stop');
                        }
                    });

                    session.addEventListener('apiUnavailable', function(){
                        $("#simulationContainer").hide();
                    });

                    // START
                    session.addEventListener('start', function(){
                        console.log("Session started");
                        $("#extracting").hide();
                        //$("#rdpURL").attr("href", "rdp://" + session.rdpURL);
                        $("#apiLoading").show();
                        $("#play").addClass("active");
                        $("#pause").removeClass("active");
                        $("#stop").removeClass("active");
                        $("#stop").removeClass("disabled");
                        $("#pause").removeClass("disabled");
                    });
                    // START ERROR
                    session.addEventListener('startError', function(msg, err){
                        console.log("Unable to start session! " + msg + " error code: " + err);
                    });

                    // RESUME
                    session.addEventListener('resume', function(){
                        console.log("Session resumed");
                        //$("#rdpURL").attr("href", "rdp://" + session.rdpURL);
                        $("#apiLoading").show();
                        $("#play").addClass("active");
                        $("#pause").removeClass("active");
                        $("#stop").removeClass("disabled");
                    });
                    // RESUME ERROR
                    session.addEventListener('resumeError', function(msg, err){
                        console.log("Unable to resume session! " + msg + " error code: " + err);
                    });

                    // PAUSE 
                    session.addEventListener('pause', function(){
                        console.log("Session paused");
                        //$("#rdpURL").attr("href", "rdp://" + session.rdpURL);
                        $("#pause").addClass("active");
                        $("#play").removeClass("active");
                        $("#stop").addClass("disabled");
                        $("#apiURL").hide();
                        $("#timerContainer").hide();
                        // Stop also the poll
                        clearInterval(intervalId);
                        clearInterval(timerId);
                        // Reset it
                        intervalId = -1;
                        timerId = -1;
                    });
                    // PAUSE ERROR
                    session.addEventListener('pauseError', function(msg, err){
                        console.log("Unable to pause session! " + msg + " error code: " + err);
                    });

                    // STOP == HIBERNATE we freeze the VM
                    session.addEventListener('hibernate', function(){
                        console.log("Session hibernated");
                        //$("#rdpURL").attr("href", "rdp://" + session.rdpURL);
                        $("#play").removeClass("active");
                        $("#pause").removeClass("active");
                        $("#pause").addClass("disabled");
                        $("#stop").addClass("active");
                        $("#simulationContainer").hide();
                        $("#jobLoading").hide();
                        $("#apiLoading").hide();
                        $("#timerContainer").hide();
                    });
                    // STOP ERROR == HIBERNATE ERROR
                    session.addEventListener('hibernateError', function(msg, err){
                        console.log("Unable to hibernate session! " + msg + " error code: " + err);
                    });
                    // CLOSE
                    session.addEventListener('close', function() {
                        console.log("Session is closed");
                        //Remove session
                        localStorage.removeItem("cernvmSession");
                        $(".recoverSession").hide();
                        $(".newSession").show();
                        $("#vm-controls").hide();
                        $("#vm-config").show();
                        $("#simulationContainer").hide();
                        $("#jobLoading").hide();
                        $("#apiLoading").hide();
                    });
                    // CLOSE ERROR
                    session.addEventListener('closeError', function(msg, err){
                        console.log("Unable to close session! " + msg + " error code: " + err);
                    });

                    // DEBUG
                    //session.addEventListener('debug', function(data){
                    //    console.log(data);
                    //});

                    session.addEventListener('apiStateChanged', function(isApiAvailable, url) {
                        if (!isApiAvailable) {
                            $("#simulationContainer").hide();
                        }
                        else {
                            $("#timerContainer").show();
                            //var logs = $("<a/>");
                            //logs.addClass("btn");
                            //logs.html('<i class="icon-cogs"></i> Log files');
                            $("#logs").off('click').on('click', function(){
                                var windowObjectReference = window.open(session.apiURL + "/logs" , "cernvmLogs");
                            });
                            //$("#logs").attr("href", session.apiURL + "/logs");
                            //$("#logs").attr("target", "_blank");
                            $("#logs").removeClass("disabled");
                            $("#info").show();

                            if (intervalId == -1) {
                                showFigures(session.apiURL);
                                intervalId = setInterval(function(){showFigures(session.apiURL)}, pollingTime);
                                $("#timer").val(timerValue).trigger('change');
                                timerId = setInterval(function(){timer();}, 1000);
                            }
                            else {
                                clearInterval(intervalId);
                                showFigures(session.apiURL);
                                intervalId = setInterval(function(){showFigures(session.apiURL)}, pollingTime);
                                $("#timer").val(timerValue).trigger('change');
                                timerId = setInterval(function(){timer();}, 60000);
                            }
                            });
                        }

                    session.addEventListener('progress', function(val, msg){
                        console.log(val + " " + msg);
                        var pct = String(val + "%");
                        $("#progress").css("width", pct);
                        $("#msg").text(msg);
                    });

                    $("#timer").val(timerValue).trigger('change');
                    $("#vm-config").hide();
                    console.log("Create Session: " + session.state);
                    if (session.state == 4) {
                        $("#play").addClass("active");
                    }
                    if (session.state == 6) {
                        $("#pause").addClass("active");
                        $("#stop").addClass("disabled");
                    }
                    if (session.state == 2 ) {
                        session.start();
                        $("#play").addClass("active");
                    }
                    $("#vm-controls").show();

                $("#play").off('click').on('click', function(){
                    $("#play").addClass("active");
                    console.log("Session state: " + session.state);
                    // If session paused resume it
                    if (session.state == 6) {
                        res = session.resume();
                        return;
                    }

                    // If session starting or started pause it
                    //if ((session.state == 3) || (session.state == 4)) {
                    //    res = session.pause();
                    //    return;
                    //}

                    // Else start
                    if ((session.state == 0) || (session.state == 2)) {
                        res = session.start();
                        return;
                    }
                });

                $("#pause").off('click').on('click', function(){
                    session.pause();
                });
                $("#stop").off('click').on('click', function(){
                    if (session.state == 4) {
                        $("#stop").html('<i class="icon-refresh icon-spin"></i> Stopping ');
                        $("#stop").addClass("disabled");
                        $("#pause").addClass("disabled");
                        session.hibernate();
                    }
                });
                $("#clean").off('click').on('click', function(){
                    session.close();
                });


                }

                function session_failure(error_code) {
                    if (error_code == -20) {
                        $("#sessionContainer").addClass("error");
                        $("#wrongPassword").show();
                    }
                    console.log(error_code);
                }

                function showFigures(url){
                    $("#apiLoading").hide();

                    var xhr = $.ajax({
                        url: url + '/job/resources.json',
                        cache: false,
                        dataType: 'json'
                    });
                    xhr.done(function(data, textStatus, request){
                        console.log();
                        var histograms = data.sprites.histograms;
                            $("#jobLoading").hide();
                            $("#sim").html('');
                            $.each(data.jobMetaData, function(key, value) {
                                var p = $("<p/>");
                                p.html("<strong>" + key + "</strong>" + ": " + value);
                                $("#sim").append(p);
                            });
                            var p = $("<p/>");
                            p.html("<strong>Last Modified </strong>: " + request.getResponseHeader("Last-Modified"));
                            $("#sim").append(p);
                            $("#info").show();
                            $("#simulationContainer").show();

                        if (histograms.length != 0) {
                            // Now the figures
                            $("#galleria").html('');
                            for(var i=0; i< histograms.length; i++){
                                var img = $("<img/>");
                                img.attr("src", url + "/job" + histograms[i]);
                                $("#galleria").append(img);
                            }
                            Galleria.loadTheme('//cdnjs.cloudflare.com/ajax/libs/galleria/1.2.9/themes/classic/galleria.classic.min.js');
                            Galleria.configure({
                                lightbox: true,
                                showCounter: false,
                                thumbnails: "numbers",
                            });

                            Galleria.run("#galleria");
                            $("#galleria").show();
                        }
                        else {
                            var figureLoading = $("<div/>", {id:'figureLoading'});
                            figureLoading.addClass("alert alert-info");
                            figureLoading.html("<strong>Info: </strong> Loading figures... (it might take a while)");
                            $("#galleria").html("").append(figureLoading);
                            $("#galleria").show();
                        }
                    });

                    xhr.fail(function(){
                        console.log("Figures not available yet");
                        $("#apiLoading").hide();
                        $("#jobLoading").show();
                    });

                }

                $("#create-session").off('click').on('click', function(){
                    var session_name = $("#session-name").val();
                    session_name = "cernvm";
                    var session_secret = $("#session-secret").val();
                    if (session_secret == '') {
                        alert("Password field is required!");
                        return;

                    }
                    $("#session").hide();
                    $("#vm-config").show();
                    $("#progress").css("width", "0%");
                    $("#msg").text(" Setting Virtual Machine");
                });

                $(".create-vm").off('click').on('click', function(evt){
                    var _html = $(".create-vm:visible").html();
                    $(".create-vm:visible").html('<i class="icon-refresh icon-spin"></i> ' + _html);
                    var config = {'cpus': 1, 'ram': 256, 'disk': 1024, 'version': '1.4',
                                 'diskURL': 'http://lhcathome2.cern.ch/test4theory/download/255/cernvm.vmdk.gz=cernvm_2.5.1-3-1.1_vmdk.gz',
                                 'flags': 8|4};
                    // Hacked version to support CORS ;-)
                    config.diskURL = 'http://dl.dropboxusercontent.com/u/27667029/cors-enabled.vdi.gz';
                    config.diskChecksum= '5b0e2a763cef752420ee79e5ea2fa41c7b4a43788b1b45bacc58e974ebac70c3';
                    var userData = "plugins=cernvm" +
                                   "[cernvm]" +
                                   "users=user:users:s3cret" +
                                   "services=httpd";

                    config.cpus = parseInt($("#cpus").val());
                    config.ram = parseInt($("#ram").val());
                    config.disk = parseInt($("#disk").val());

                    var url = 'http://crowdcrafting.org/api/vmcp'; 
                    url += '?cpus=' + config.cpus;
                    url += '&secret=' + "cernvm";
                    url += '&name=' + "cernvmtest";
                    url += '&ram=' + config.ram;
                    url += '&disk=' + config.disk;
                    url += '&flags=' + config.flags;
                    url += '&userData=' + userData;
                    url += '&diskURL=' + config.diskURL;
                    url += '&diskChecksum=' + config.diskChecksum;
                    api.requestSession(url, session_requested);

                });


            }, true); // End of CVM
        } // End of Modernizr.localstorage check
        else {
            alert("Sorry, but your browser does not support HTML5 features to view this page. Please, use one of the free and open source browsers like Mozilla Firefox or Google Chrome.");
        }
    }); // End of ready
</script>
