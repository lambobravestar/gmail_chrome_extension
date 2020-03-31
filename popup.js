var internalDateTmp = [];
var nth = 0;
var documentIsClicked = false;
var imageIsClicked = false;
var videoIsClicked = false;
var musicIsClicked = false;

var allIsClicked = true;
var searchIsChanged = false;
var searchFlag = false;
var dataArr = new Array;
var fetchMsgArr = [];
var fetchMsgCnt = 0;
var scrollCnt = 0;
var isFetching = false;
var sortedFetchMsgArr = [];
var token;
var emailUrl = "https://mail.google.com/mail/u/0/#inbox/";
let params = `scrollbars=no, resizable=no, status=no, location=no, toolbar=no, menubar=no, width=1300, height=800, left=100, top=100`;
var dateArr = [];

chrome.runtime.onMessage.addListener(function (message) {

    switch (message.action) {
        case "list":

            $(document).ready(function () {

                var pageTotalCnt = message.pageTotalCnt;
                dataArr = message.data;

                // console.log("here data from background----->", dataArr, pageTotalCnt)

                for (k = 0; k < pageTotalCnt; k++) {

                    var idObjs = dataArr[k].messages;
                    var threadIdArr = idObjs.map(function (idObj) {
                        return Object.values(idObj)[1];
                    });
                    var i;
                    token = message.token;
                    fetchMsgCnt = 0;
                    for (i = 0; i < threadIdArr.length; i++) {

                        threadId = threadIdArr[i];
                        fetchMessages(threadId, token, threadIdArr.length);
                    }

                }
                document.getElementById("allType").addEventListener("click", allClickHandler);

                $("div.link").click(function () {
                    $("div.link").css("background-color", "white");
                    $("div.link").css("color", "black")
                    $(this).css("background-color", "pink");
                    $(this).css("color", "red");
                });

                function allClickHandler() {

                    document.getElementById("dateSlider").style.display = "none";

                    if (searchFlag) {

                        document.getElementById("loading").style.display = "block";
                        document.getElementById("thumbnail").style.backgroundColor = "white";

                        fetchMsgCnt = 0;
                        searchFlag = false;
                        document.getElementById("thumbnail").innerHTML = "";
                        for (i = 0; i < threadIdArr.length; i++) {

                            threadId = threadIdArr[i];
                            fetchMessages(threadId, token, threadIdArr.length);
                        }

                    } else {
                        var _nodePdf = document.getElementsByClassName('pdfFormat');
                        for (var i = 0; i < _nodePdf.length; i++) {
                            _nodePdf[i].setAttribute("style", "display:flex;");
                        }
                        var _nodeWord = document.getElementsByClassName('wordFormat');
                        for (var i = 0; i < _nodeWord.length; i++) {
                            _nodeWord[i].setAttribute("style", "display:flex;");
                        }
                        var _nodeTxt = document.getElementsByClassName('txtFormat');
                        for (var i = 0; i < _nodeTxt.length; i++) {
                            _nodeTxt[i].setAttribute("style", "display:flex;");
                        }

                        var _nodeImage = document.getElementsByClassName('imageFormat');
                        for (var i = 0; i < _nodeImage.length; i++) {
                            _nodeImage[i].setAttribute("style", "display:flex;");
                        }
                        var _nodeVideo = document.getElementsByClassName('videoFormat');
                        for (var i = 0; i < _nodeVideo.length; i++) {
                            _nodeVideo[i].setAttribute("style", "display:flex;");
                        }
                        var _nodeMusic = document.getElementsByClassName('musicFormat');
                        for (var i = 0; i < _nodeMusic.length; i++) {
                            _nodeMusic[i].setAttribute("style", "display:flex;");
                        }
                        var _nodeOther = document.getElementsByClassName('otherFormat');
                        for (var i = 0; i < _nodeOther.length; i++) {
                            _nodeOther[i].setAttribute("style", "display:flex;");
                        }
                    }
                }

                document.getElementById("documentType").addEventListener("click", documentClickHandler);
                function documentClickHandler() {

                    var _nodePdf = document.getElementsByClassName('pdfFormat');
                    for (var i = 0; i < _nodePdf.length; i++) {
                        _nodePdf[i].setAttribute("style", "display:flex;");
                    }
                    var _nodeWord = document.getElementsByClassName('wordFormat');
                    for (var i = 0; i < _nodeWord.length; i++) {
                        _nodeWord[i].setAttribute("style", "display:flex;");
                    }
                    var _nodeTxt = document.getElementsByClassName('txtFormat');
                    for (var i = 0; i < _nodeTxt.length; i++) {
                        _nodeTxt[i].setAttribute("style", "display:flex;");
                    }

                    var _nodeImage = document.getElementsByClassName('imageFormat');
                    for (var i = 0; i < _nodeImage.length; i++) {
                        _nodeImage[i].setAttribute("style", "display:none;");
                    }
                    var _nodeVideo = document.getElementsByClassName('videoFormat');
                    for (var i = 0; i < _nodeVideo.length; i++) {
                        _nodeVideo[i].setAttribute("style", "display:none;");
                    }
                    var _nodeMusic = document.getElementsByClassName('musicFormat');
                    for (var i = 0; i < _nodeMusic.length; i++) {
                        _nodeMusic[i].setAttribute("style", "display:none;");
                    }
                    var _nodeOther = document.getElementsByClassName('otherFormat');
                    for (var i = 0; i < _nodeOther.length; i++) {
                        _nodeOther[i].setAttribute("style", "display:none;");
                    }
                }

                document.getElementById("imageType").addEventListener("click", imageClickHandler);

                function imageClickHandler() {
                    var _nodeImage = document.getElementsByClassName('imageFormat');
                    for (var i = 0; i < _nodeImage.length; i++) {
                        _nodeImage[i].setAttribute("style", "display:flex;");
                    }
                    var _nodePdf = document.getElementsByClassName('pdfFormat');
                    for (var i = 0; i < _nodePdf.length; i++) {
                        _nodePdf[i].setAttribute("style", "display:none;");
                    }
                    var _nodeWord = document.getElementsByClassName('wordFormat');
                    for (var i = 0; i < _nodeWord.length; i++) {
                        _nodeWord[i].setAttribute("style", "display:none;");
                    }
                    var _nodeTxt = document.getElementsByClassName('txtFormat');
                    for (var i = 0; i < _nodeTxt.length; i++) {
                        _nodeTxt[i].setAttribute("style", "display:none;");
                    }
                    var _nodeVideo = document.getElementsByClassName('videoFormat');
                    for (var i = 0; i < _nodeVideo.length; i++) {
                        _nodeVideo[i].setAttribute("style", "display:none;");
                    }
                    var _nodeMusic = document.getElementsByClassName('musicFormat');
                    for (var i = 0; i < _nodeMusic.length; i++) {
                        _nodeMusic[i].setAttribute("style", "display:none;");
                    }
                    var _nodeOther = document.getElementsByClassName('otherFormat');
                    for (var i = 0; i < _nodeOther.length; i++) {
                        _nodeOther[i].setAttribute("style", "display:none;");
                    }
                }

                document.getElementById("videoType").addEventListener("click", videoClickHandler);

                function videoClickHandler() {
                    var _nodeVideo = document.getElementsByClassName('videoFormat');
                    for (var i = 0; i < _nodeVideo.length; i++) {
                        _nodeVideo[i].setAttribute("style", "display:flex;");
                    }
                    var _nodePdf = document.getElementsByClassName('pdfFormat');
                    for (var i = 0; i < _nodePdf.length; i++) {
                        _nodePdf[i].setAttribute("style", "display:none;");
                    }
                    var _nodeWord = document.getElementsByClassName('wordFormat');
                    for (var i = 0; i < _nodeWord.length; i++) {
                        _nodeWord[i].setAttribute("style", "display:none;");
                    }
                    var _nodeTxt = document.getElementsByClassName('txtFormat');
                    for (var i = 0; i < _nodeTxt.length; i++) {
                        _nodeTxt[i].setAttribute("style", "display:none;");
                    }

                    var _nodeImage = document.getElementsByClassName('imageFormat');
                    for (var i = 0; i < _nodeImage.length; i++) {
                        _nodeImage[i].setAttribute("style", "display:none;");
                    }

                    var _nodeMusic = document.getElementsByClassName('musicFormat');
                    for (var i = 0; i < _nodeMusic.length; i++) {
                        _nodeMusic[i].setAttribute("style", "display:none;");
                    }
                    var _nodeOther = document.getElementsByClassName('otherFormat');
                    for (var i = 0; i < _nodeOther.length; i++) {
                        _nodeOther[i].setAttribute("style", "display:none;");
                    }
                }

                document.getElementById("musicType").addEventListener("click", musicClickHandler);

                function musicClickHandler() {
                    var _nodeMusic = document.getElementsByClassName('musicFormat');
                    for (var i = 0; i < _nodeMusic.length; i++) {
                        _nodeMusic[i].setAttribute("style", "display:flex;");
                    }
                    var _nodePdf = document.getElementsByClassName('pdfFormat');
                    for (var i = 0; i < _nodePdf.length; i++) {
                        _nodePdf[i].setAttribute("style", "display:none;");
                    }
                    var _nodeWord = document.getElementsByClassName('wordFormat');
                    for (var i = 0; i < _nodeWord.length; i++) {
                        _nodeWord[i].setAttribute("style", "display:none;");
                    }
                    var _nodeTxt = document.getElementsByClassName('txtFormat');
                    for (var i = 0; i < _nodeTxt.length; i++) {
                        _nodeTxt[i].setAttribute("style", "display:none;");
                    }

                    var _nodeImage = document.getElementsByClassName('imageFormat');
                    for (var i = 0; i < _nodeImage.length; i++) {
                        _nodeImage[i].setAttribute("style", "display:none;");
                    }
                    var _nodeVideo = document.getElementsByClassName('videoFormat');
                    for (var i = 0; i < _nodeVideo.length; i++) {
                        _nodeVideo[i].setAttribute("style", "display:none;");
                    }

                    var _nodeOther = document.getElementsByClassName('otherFormat');
                    for (var i = 0; i < _nodeOther.length; i++) {
                        _nodeOther[i].setAttribute("style", "display:none;");
                    }
                }
            });

            break;
    }
});

async function isLast(token) {

    document.getElementById("loading").style.display = "none";
    document.getElementById("thumbnail").style.backgroundColor = "#f3f6fc";

    document.getElementById("dateSlider").style.display = "block";

    sortedFetchMsgArr = fetchMsgArr.sort(function (a, b) {
        if (a.internalDate < b.internalDate)
            return -1;
        else if (a.internalDate == b.internalDate)
            return 0;
        else
            return 1;
    });
    sortedFetchMsgArr.reverse();

    async function scrollHandler() {

        var wrap = document.getElementById('thumbnail');
        var contentHeight = wrap.offsetHeight;
        var yOffset = window.pageYOffset;
        var y = yOffset + (window.innerHeight - 140);

        var nthSclTop = Math.floor((document.body.scrollTop - 121) / 150);
        var nodeSvg = document.getElementById("slideSvg");
        var svgDoc = nodeSvg.contentDocument;
        svgDoc.getElementById("svgText").textContent = dateArr[nthSclTop];

        // // It's important to add an load event listener to the object,
        // // as it will load the svg doc asynchronously
        // nodeSvg.addEventListener("load",function(){
        //     var svgDoc = nodeSvg.contentDocument;
        //     svgDoc.getElementById("svgText").textContent = nthSclTop ;

        // }, false);


        if (!isFetching && !searchFlag) {

        }

        if (y >= contentHeight && !isFetching && !searchFlag) {
            isFetching = true;
            await displayAttach(sortedFetchMsgArr, token);
            isFetching = false;
        }
    }

    $(window).scroll(function () {
        var scroll = $(window).scrollTop();

        if (scroll >= 100) {
            $(".fixed-header").addClass("fixedPos");
        }
        else {

            $(".fixed-header").removeClass("fixedPos");
        }
    });


    window.onscroll = scrollHandler;

    isFetching = true;
    scrollCnt = 0;
    await displayAttach(sortedFetchMsgArr, token);
    isFetching = false;

    fetchMsgArr = [];
}

var displayAttach = async (sortedFetchMsgArr, token) => {

    var numPerScroll = 0;
    var i = scrollCnt;
    for (i; i < sortedFetchMsgArr.length; i++) {

        scrollCnt++;
        if (searchIsChanged) {
            document.getElementById("searchText").removeEventListener("change", searchFunc);
        }

        if (sortedFetchMsgArr[i].payload.mimeType == "multipart/mixed" && sortedFetchMsgArr[i].payload.parts[1]) {

            nth++;
            numPerScroll++;
            var h = 0;
            for (h = 0; h < sortedFetchMsgArr[i].payload.headers.length; h++) {
                if (sortedFetchMsgArr[i].payload.headers[h].name === "Date") {
                    var formattedDate = sortedFetchMsgArr[i].payload.headers[h].value;
                    break;
                }
            }
            var emailId = sortedFetchMsgArr[i].id;
            var dateInfo = Number(sortedFetchMsgArr[i].internalDate);
            var slideDate = new Date(dateInfo);
            var detailDate = slideDate.getDate() + '/' + (slideDate.getMonth() + 1) + '/' + slideDate.getFullYear() + '/' + slideDate.getHours() + '/' + slideDate.getMinutes();

            dateArr.push(detailDate);

            var attachmentId = sortedFetchMsgArr[i].payload.parts[1].body.attachmentId;
            var j = 0;
            for (j = 0; j < sortedFetchMsgArr[i].payload.headers.length; j++) {
                if (sortedFetchMsgArr[i].payload.headers[j].name === "Message-ID") {
                    var messageId = sortedFetchMsgArr[i].payload.headers[j].value;
                    break;
                } else continue;
            }

            for (k = 0; k < sortedFetchMsgArr[i].payload.headers.length; k++) {
                if (sortedFetchMsgArr[i].payload.headers[k].name === "From") {
                    var fromEmailAddr = sortedFetchMsgArr[i].payload.headers[k].value;
                    var count_start = fromEmailAddr.indexOf("<");
                    var count_end = fromEmailAddr.indexOf(">");
                    var _fromEmail = fromEmailAddr.substr(count_start + 1, count_end - count_start - 1);
                    var _fromName = fromEmailAddr.substr(0, count_start - 1);
                    var fromEmail = _fromEmail.toUpperCase();
                    var fromName = _fromName.toUpperCase();

                    break;
                }
            }

            for (k = 0; k < sortedFetchMsgArr[i].payload.headers.length; k++) {
                if (sortedFetchMsgArr[i].payload.headers[k].name === "Subject") {
                    var _emailSubject = sortedFetchMsgArr[i].payload.headers[k].value;
                    var emailSubject = _emailSubject.toUpperCase();
                }
            }

            var attachType = sortedFetchMsgArr[i].payload.parts[1].mimeType;
            var attachFileName_origin = sortedFetchMsgArr[i].payload.parts[1].filename;
            if (attachFileName_origin.length > 29) {
                var partAttachFileName = attachFileName_origin.slice(0, 26);
                attachFileName_origin = partAttachFileName + "..."
            }
            var attachFileSize = Math.round(sortedFetchMsgArr[i].payload.parts[1].body.size / 1000);
            var extension = attachFileName_origin.substr(attachFileName_origin.lastIndexOf('.'));
            var displayExt = attachFileName_origin.substr(attachFileName_origin.lastIndexOf('.') + 1).toUpperCase();
            var _extension = extension.toUpperCase();
            var attachFileName = attachFileName_origin.substr(0, attachFileName_origin.lastIndexOf('.'));
            var attachFileSize = attachFileSize + 'KB';
            var _attachFileName = attachFileName.toUpperCase();

            if (attachType == "application/pdf") {
                attachType = 'pdfFormat';
            } else if (attachType == "image/png" || attachType == "image/jpeg") {
                attachType = 'imageFormat';
            } else if (attachType == "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || attachType == "application/msword" || _extension == ".DOCX") {
                attachType = 'wordFormat';
            } else if (attachType == "text/plain") {
                attachType = 'txtFormat';
            } else if (attachType == "video/mp4" || attachType == "video/x-msvideo") {
                attachType = "videoFormat";
            } else if (attachType == "audio/mpeg") {
                attachType = "musicFormat";
            } else {
                attachType = "otherFormat";
            }

            var nameFlag = false;
            var emailFlag = false;
            var subjectFlag = false;
            var fileNameFlag = false;
            var extensionFlag = false;
            var generalFlag = true;

            if (!searchIsChanged) {

                document.getElementById("searchText").addEventListener("change", searchFunc);
            }
            // console.log("messageID ------>", messageId)
            // console.log("attachmentID ------>", attachmentId)

            if (_extension != ".ICS" && attachmentId != undefined && messageId != undefined) {
                if (messageId.indexOf("/") != -1) {
                    messageId = messageId.replace(/\//g, '');
                }
                await fetchAttachments(messageId, attachmentId, emailId, token, attachType, nth, attachFileName_origin, attachFileSize, displayExt, fromEmailAddr, detailDate, nameFlag, emailFlag, subjectFlag, fileNameFlag, generalFlag, extensionFlag);
            }

            emailUrl = emailUrl.replace(emailId, "");
        }
        if (numPerScroll == 5) {
            break;
        }
    }
}

async function searchFunc() {

    document.getElementById("thumbnail").innerHTML = "";

    for (m = 0; m < sortedFetchMsgArr.length; m++) {

        if (searchIsChanged) {
            document.getElementById("searchText").removeEventListener("change", searchFunc);
        }

        if (sortedFetchMsgArr[m].payload.mimeType == "multipart/mixed" && sortedFetchMsgArr[m].payload.parts[1]) {

            nth++;
            var h = 0;
            for (h = 0; h < sortedFetchMsgArr[m].payload.headers.length; h++) {
                if (sortedFetchMsgArr[m].payload.headers[h].name === "Date") {
                    var formattedDate = sortedFetchMsgArr[m].payload.headers[h].value;
                    break;
                }
            }

            var emailId = sortedFetchMsgArr[m].id;
            var dateInfo = Number(sortedFetchMsgArr[m].internalDate);
            var slideDate = new Date(dateInfo);
            var detailDate = slideDate.getDate() + '/' + (slideDate.getMonth() + 1) + '/' + slideDate.getFullYear() + '/' + slideDate.getHours() + '/' + slideDate.getMinutes();

            var attachmentId = sortedFetchMsgArr[m].payload.parts[1].body.attachmentId;
            var j = 0;
            for (j = 0; j < sortedFetchMsgArr[m].payload.headers.length; j++) {
                if (sortedFetchMsgArr[m].payload.headers[j].name === "Message-ID") {
                    var messageId = sortedFetchMsgArr[m].payload.headers[j].value;
                    break;
                } else continue;
            }

            for (k = 0; k < sortedFetchMsgArr[m].payload.headers.length; k++) {
                if (sortedFetchMsgArr[m].payload.headers[k].name === "From") {
                    var fromEmailAddr = sortedFetchMsgArr[m].payload.headers[k].value;
                    var count_start = fromEmailAddr.indexOf("<");
                    var count_end = fromEmailAddr.indexOf(">");
                    var _fromEmail = fromEmailAddr.substr(count_start + 1, count_end - count_start - 1);
                    var _fromName = fromEmailAddr.substr(0, count_start - 1);
                    var fromEmail = _fromEmail.toUpperCase();
                    var fromName = _fromName.toUpperCase();

                    break;
                }
            }

            for (k = 0; k < sortedFetchMsgArr[m].payload.headers.length; k++) {
                if (sortedFetchMsgArr[m].payload.headers[k].name === "Subject") {
                    var _emailSubject = sortedFetchMsgArr[m].payload.headers[k].value;
                    var emailSubject = _emailSubject.toUpperCase();
                }
            }

            var attachType = sortedFetchMsgArr[m].payload.parts[1].mimeType;
            var attachFileName_origin = sortedFetchMsgArr[m].payload.parts[1].filename;
            var attachFileSize = Math.round(sortedFetchMsgArr[m].payload.parts[1].body.size / 1000);
            var extension = attachFileName_origin.substr(attachFileName_origin.lastIndexOf('.'));
            var displayExt = attachFileName_origin.substr(attachFileName_origin.lastIndexOf('.') + 1).toUpperCase();
            var _extension = extension.toUpperCase();
            var attachFileName = attachFileName_origin.substr(0, attachFileName_origin.lastIndexOf('.'));
            var attachFileSize = attachFileSize + 'KB';
            var _attachFileName = attachFileName.toUpperCase();

            if (attachType == "application/pdf") {
                attachType = 'pdfFormat';
            } else if (attachType == "image/png" || attachType == "image/jpeg") {
                attachType = 'imageFormat';
            } else if (attachType == "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || attachType == "application/msword" || attachType == "application/octet-stream") {
                attachType = 'wordFormat';
            } else if (attachType == "text/plain") {
                attachType = 'txtFormat';
            } else if (attachType == "video/mp4" || attachType == "video/x-msvideo") {
                attachType = "videoFormat";
            } else if (attachType == "audio/mpeg") {
                attachType = "musicFormat";
            } else {
                attachType = "otherFormat";
            }
            nameFlag = false;
            emailFlag = false;
            subjectFlag = false;
            fileNameFlag = false;
            generalFlag = false;
            extensionFlag = false;
            searchFlag = true;

            var searchText = document.getElementById("searchText").value.toUpperCase();

            if (fromName.indexOf(searchText) > -1) {
                nth++;
                nameFlag = true;
                await fetchAttachments(messageId, attachmentId, emailId, token, attachType, nth, attachFileName_origin, attachFileSize, displayExt, fromEmailAddr, detailDate, nameFlag, emailFlag, subjectFlag, fileNameFlag, generalFlag, extensionFlag);
                emailUrl = emailUrl.replace(emailId, "");

            } else if ((fromEmail.indexOf(searchText) > -1) && (searchText.indexOf("@") > -1)) {

                nth++;
                emailFlag = true;
                await fetchAttachments(messageId, attachmentId, emailId, token, attachType, nth, attachFileName_origin, attachFileSize, displayExt, fromEmailAddr, detailDate, nameFlag, emailFlag, subjectFlag, fileNameFlag, generalFlag, extensionFlag);
                emailUrl = emailUrl.replace(emailId, "");

            } else if (emailSubject.indexOf(searchText) > -1) {

                nth++;
                subjectFlag = true;
                await fetchAttachments(messageId, attachmentId, emailId, token, attachType, nth, attachFileName_origin, attachFileSize, displayExt, fromEmailAddr, detailDate, nameFlag, emailFlag, subjectFlag, fileNameFlag, generalFlag, extensionFlag);
                emailUrl = emailUrl.replace(emailId, "");

            } else if (_attachFileName.indexOf(searchText) > -1) {

                nth++;
                fileNameFlag = true;
                await fetchAttachments(messageId, attachmentId, emailId, token, attachType, nth, attachFileName_origin, attachFileSize, displayExt, fromEmailAddr, detailDate, nameFlag, emailFlag, subjectFlag, fileNameFlag, generalFlag, extensionFlag);
                emailUrl = emailUrl.replace(emailId, "");

            } else if (_extension == searchText) {

                nth++;
                extensionFlag = true;
                await fetchAttachments(messageId, attachmentId, emailId, token, attachType, nth, attachFileName_origin, attachFileSize, displayExt, fromEmailAddr, detailDate, nameFlag, emailFlag, subjectFlag, fileNameFlag, generalFlag, extensionFlag);
                emailUrl = emailUrl.replace(emailId, "");

            }

        }
    }
}

function fetchMessages(threadId, token, total, userId = "me") {

    // search = false   as parameter
    var url = "https://www.googleapis.com/gmail/v1/users/" + userId + "/messages/" + threadId;

    fetch(url, {
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + token
        }
    }).then((res) => {
        return res.json();
    }).then(function (obj) {

        // console.log("aaaaaaaaaaaaaaaaaaaaa", obj);
        if (!obj.error) {
            fetchMsgArr.push(obj);
        }
        fetchMsgCnt++;
        if (fetchMsgCnt == total) {
            console.log("fetching message count---->", fetchMsgCnt)
            isLast(token);
        }
    }).catch(error => console.log(error));

}

var fetchAttachments = async (messageId, attachmentId, emailId, token, attachType, nth, attachFileName_origin, attachFileSize, displayExt, fromEmailAddr, detailDate, nameFlag, emailFlag, subjectFlag, fileNameFlag, generalFlag, extensionFlag, userId = "me") => {

    return new Promise((resolve, reject) => {
        var url = "https://www.googleapis.com/gmail/v1/users/" + userId + "/messages/" + messageId + "/attachments/" + attachmentId;

        fetch(url, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + token
            }
        }).then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Something went wrong');
            }
        }).then((attach) => {

            var attachSize = attach.size;
            var attachData = attach.data;
            var _base64Attach = attachData.replace(/-/g, "+");
            var base64Attach = _base64Attach.replace(/_/g, "/");

            /*   Check if attach data is base64...
    
                var base64Rejex = /^(?:[A-Z0-9+\/]{4})*(?:[A-Z0-9+\/]{2}==|[A-Z0-9+\/]{3}=|[A-Z0-9+\/]{4})$/i;
                var isBase64Valid = base64Rejex.test(base64Attach);
                if (isBase64Valid) {
                    console.log('It is base64');
                } else {
                    console.log('it is not in base64');
                }
            */
            var binary = atob(base64Attach.replace(/\s/g, ''));
            var len = binary.length;
            var buffer = new ArrayBuffer(len);
            var view = new Uint8Array(buffer);
            for (var bini = 0; bini < len; bini++) {
                view[bini] = binary.charCodeAt(bini);
            }

            // create the blob object with content-type "application/pdf"               
            var blob = new Blob([view], { type: "application/pdf" });
            var url = URL.createObjectURL(blob);
            emailUrl += emailId;

            switch (attachType) {
                case 'pdfFormat':

                    if (nameFlag || emailFlag || subjectFlag || fileNameFlag || generalFlag || extensionFlag) {

                        var node = document.createElement("div");
                        var nthPdfId = "pdf" + nth;
                        node.setAttribute("id", nthPdfId);
                        node.setAttribute("class", 'pdfFormat');
                        document.getElementById("thumbnail").appendChild(node);

                        var pdfIconDiv = document.createElement("div");
                        var pdfIconDivId = "icon" + nthPdfId;
                        pdfIconDiv.setAttribute("id", pdfIconDivId);
                        pdfIconDiv.setAttribute("class", "iconSvg");
                        document.getElementById(nthPdfId).appendChild(pdfIconDiv);

                        var nodePdfIcon = document.createElement("img")
                        nodePdfIcon.setAttribute("src", "img/text_icon.svg");
                        nodePdfIcon.setAttribute("width", "30px");
                        nodePdfIcon.setAttribute("height", "30px");
                        document.getElementById(pdfIconDivId).appendChild(nodePdfIcon);

                        var nodePdf = document.createElement("div")
                        var newPdfContentId = "pdf-contents" + nthPdfId;
                        nodePdf.setAttribute("id", newPdfContentId);
                        nodePdf.setAttribute("class", "thumbData");
                        document.getElementById(nthPdfId).appendChild(nodePdf);
                        var nodeCanvas = document.createElement("canvas");
                        var newCanvasId = "pdf-canvas" + nthPdfId;
                        nodeCanvas.setAttribute("id", newCanvasId);
                        nodeCanvas.setAttribute("width", 65);
                        var newNodeCanvas = document.getElementById(newPdfContentId).appendChild(nodeCanvas);

                        var __PDF_DOC,
                            __CANVAS = $('#' + newCanvasId).get(0),
                            __CANVAS_CTX = __CANVAS.getContext('2d');

                        showPDF(url, newPdfContentId, __CANVAS, __CANVAS_CTX);

                        showDetail(nthPdfId, attachFileName_origin, attachFileSize, displayExt, fromEmailAddr, detailDate, emailId);

                        document.getElementById(nthPdfId).addEventListener("click", displayDetailPdf);

                        function displayDetailPdf() {

                            document.getElementById("dateSlider").style.zIndex = "0";
                            var modal = document.getElementById("myModal");
                            modal.style.display = "block";
                            var nodeSection = document.createElement("div");
                            nodeSection.setAttribute("id", "modalPdf");
                            document.getElementsByClassName("modal-content")[0].appendChild(nodeSection);

                            var newPdfContent = document.createElement("div");
                            newPdfContent.setAttribute("id", newPdfContentId);
                            nodeSection.appendChild(newPdfContent);

                            var nodeCanvas = document.createElement("canvas");
                            var newModalCanvasId = "modal" + newCanvasId;
                            nodeCanvas.setAttribute("id", newModalCanvasId);
                            nodeCanvas.setAttribute("width", 80);
                            nodeCanvas.setAttribute("height", 120);
                            newPdfContent.appendChild(nodeCanvas);

                            var __PDF_DOC,
                                __CANVAS = $('#' + newModalCanvasId).get(0),
                                __CANVAS_CTX = __CANVAS.getContext('2d');

                            showPDF(url, newPdfContentId, __CANVAS, __CANVAS_CTX);

                            showDetail("modalPdf", attachFileName_origin, attachFileSize, displayExt, fromEmailAddr, detailDate);

                            document.getElementById("viewEmail").addEventListener("click", viewEmailWindow);
                            document.getElementById("downloadAttach").addEventListener("click", downloadFunc);
                            document.getElementById("deleteAttach").addEventListener("click", deleteAttachment);
                            document.getElementById("closeSpan").addEventListener("click", closeModalFunc);
                        }
                        function downloadFunc() {
                            document.getElementById("downloadAttach").removeEventListener("click", downloadFunc);
                            downloadFile(blob, attachFileName_origin);
                        }

                        function viewEmailWindow() {
                            document.getElementById("viewEmail").removeEventListener("click", viewEmailWindow);
                            emailUrl += emailId;
                            window.open(emailUrl, '_blank', params);
                            emailUrl = emailUrl.replace(emailId, "");
                        }

                    }

                    break;

                case 'imageFormat':

                    if (nameFlag || emailFlag || subjectFlag || fileNameFlag || generalFlag || extensionFlag) {

                        var node = document.createElement("div");
                        var nthImageId = "image" + nth;
                        node.setAttribute("id", nthImageId);
                        node.setAttribute("class", 'imageFormat');
                        document.getElementById("thumbnail").appendChild(node);

                        var imageIconDiv = document.createElement("div");
                        var imageIconDivId = "icon" + nthImageId;
                        imageIconDiv.setAttribute("id", imageIconDivId);
                        imageIconDiv.setAttribute("class", "iconSvg");
                        document.getElementById(nthImageId).appendChild(imageIconDiv);

                        var nodeImageIcon = document.createElement("img")
                        nodeImageIcon.setAttribute("src", "img/image_icon.svg");
                        nodeImageIcon.setAttribute("width", "30px");
                        nodeImageIcon.setAttribute("height", "30px");
                        document.getElementById(imageIconDivId).appendChild(nodeImageIcon);

                        var imageDiv = document.createElement("div");
                        var imageDivId = "div" + nthImageId;
                        imageDiv.setAttribute("id", imageDivId);
                        imageDiv.setAttribute("class", "thumbData");
                        document.getElementById(nthImageId).appendChild(imageDiv);

                        var nodeImage = document.createElement("img")
                        nodeImage.setAttribute("src", url);
                        nodeImage.setAttribute("width", "80px");
                        nodeImage.setAttribute("height", "100px");
                        document.getElementById(imageDivId).appendChild(nodeImage);

                        showDetail(nthImageId, attachFileName_origin, attachFileSize, displayExt, fromEmailAddr, detailDate);

                        document.getElementById(nthImageId).addEventListener("click", displayDetailImage);

                        function displayDetailImage() {

                            document.getElementById("dateSlider").style.zIndex = "0";
                            var modal = document.getElementById("myModal");
                            modal.style.display = "block";
                            var nodeSection = document.createElement("div");
                            nodeSection.setAttribute("id", "modalImage");
                            var nodeImage = document.createElement("img");
                            nodeImage.setAttribute("src", url);
                            nodeImage.setAttribute("width", "120px");
                            nodeImage.setAttribute("height", "150px");
                            nodeSection.appendChild(nodeImage);

                            var node_modal = document.getElementsByClassName("modal-content")[0];
                            var nthImageModalId = "modal" + nthImageId;
                            node_modal.setAttribute("id", nthImageModalId);
                            document.getElementsByClassName("modal-content")[0].appendChild(nodeSection);
                            var nodeBr = document.createElement("br");
                            showDetail("modalImage", attachFileName_origin, attachFileSize, displayExt, fromEmailAddr, detailDate);

                            document.getElementById("viewEmail").addEventListener("click", viewEmailWindow);
                            document.getElementById("downloadAttach").addEventListener("click", downloadFunc);
                            document.getElementById("deleteAttach").addEventListener("click", deleteAttachment);
                            document.getElementById("closeSpan").addEventListener("click", closeModalFunc);
                        }
                        function downloadFunc() {
                            document.getElementById("downloadAttach").removeEventListener("click", downloadFunc);
                            downloadFile(blob, attachFileName_origin);
                        }

                        function viewEmailWindow() {
                            document.getElementById("viewEmail").removeEventListener("click", viewEmailWindow);
                            emailUrl += emailId;
                            window.open(emailUrl, '_blank', params);
                            emailUrl = emailUrl.replace(emailId, "");
                        }

                        emailUrl = emailUrl.replace(emailId, "");

                    }

                    break;

                case 'wordFormat':

                    if (nameFlag || emailFlag || subjectFlag || fileNameFlag || generalFlag || extensionFlag) {

                        var node = document.createElement("div");
                        var nthWordId = "word" + nth;
                        node.setAttribute("id", nthWordId);
                        node.setAttribute("class", 'wordFormat');
                        document.getElementById("thumbnail").appendChild(node);

                        var wordIconDiv = document.createElement("div");
                        var wordIconDivId = "icon" + nthWordId;
                        wordIconDiv.setAttribute("id", wordIconDivId);
                        wordIconDiv.setAttribute("class", "iconSvg");
                        document.getElementById(nthWordId).appendChild(wordIconDiv);

                        var nodeWordIcon = document.createElement("img")
                        nodeWordIcon.setAttribute("src", "img/text_icon.svg");
                        nodeWordIcon.setAttribute("width", "30px");
                        nodeWordIcon.setAttribute("height", "30px");
                        document.getElementById(wordIconDivId).appendChild(nodeWordIcon);


                        var wordDiv = document.createElement("div");
                        var wordDivId = "div" + nthWordId;
                        wordDiv.setAttribute("id", wordDivId);
                        wordDiv.setAttribute("class", "thumbData");
                        document.getElementById(nthWordId).appendChild(wordDiv);

                        var nodeImage = document.createElement("img")
                        nodeImage.setAttribute("src", "img/word_thumb.svg");
                        nodeImage.setAttribute("width", "80px");
                        nodeImage.setAttribute("height", "100px");
                        document.getElementById(wordDivId).appendChild(nodeImage);

                        showDetail(nthWordId, attachFileName_origin, attachFileSize, displayExt, fromEmailAddr, detailDate);

                        document.getElementById(nthWordId).addEventListener("click", displayDetailWord);

                        function displayDetailWord() {

                            document.getElementById("dateSlider").style.zIndex = "0";
                            var modal = document.getElementById("myModal");
                            modal.style.display = "block";
                            var nodeSection = document.createElement("div");
                            nodeSection.setAttribute("id", "modalWord");
                            var nodeImage = document.createElement("img");
                            nodeImage.setAttribute("src", "img/word_thumb.svg");
                            nodeImage.setAttribute("width", "120px");
                            nodeImage.setAttribute("height", "150px");
                            nodeSection.appendChild(nodeImage);

                            document.getElementsByClassName("modal-content")[0].appendChild(nodeSection);
                            var nodeBr = document.createElement("br");
                            showDetail("modalWord", attachFileName_origin, attachFileSize, displayExt, fromEmailAddr, detailDate);

                            document.getElementById("viewEmail").addEventListener("click", viewEmailWindow);
                            document.getElementById("downloadAttach").addEventListener("click", downloadFunc);
                            document.getElementById("deleteAttach").addEventListener("click", deleteAttachment);
                            document.getElementById("closeSpan").addEventListener("click", closeModalFunc);
                        }
                        function downloadFunc() {
                            document.getElementById("downloadAttach").removeEventListener("click", downloadFunc);
                            downloadFile(blob, attachFileName_origin);
                        }

                        function viewEmailWindow() {
                            document.getElementById("viewEmail").removeEventListener("click", viewEmailWindow);
                            emailUrl += emailId;
                            window.open(emailUrl, '_blank', params);
                            emailUrl = emailUrl.replace(emailId, "");
                        }
                    }

                    break;

                case 'txtFormat':

                    if (nameFlag || emailFlag || subjectFlag || fileNameFlag || generalFlag || extensionFlag) {

                        var node = document.createElement("div");
                        var nthTextId = "text" + nth;
                        node.setAttribute("id", nthTextId);
                        node.setAttribute("class", 'txtFormat');
                        document.getElementById("thumbnail").appendChild(node);

                        var txtIconDiv = document.createElement("div");
                        var txtIconDivId = "icon" + nthTextId;
                        txtIconDiv.setAttribute("id", txtIconDivId);
                        txtIconDiv.setAttribute("class", "iconSvg");
                        document.getElementById(nthTextId).appendChild(txtIconDiv);

                        var nodeTxtIcon = document.createElement("img")
                        nodeTxtIcon.setAttribute("src", "img/text_icon.svg");
                        nodeTxtIcon.setAttribute("width", "30px");
                        nodeTxtIcon.setAttribute("height", "30px");
                        document.getElementById(txtIconDivId).appendChild(nodeTxtIcon);

                        var txtDiv = document.createElement("div");
                        var txtDivId = "div" + nthTextId;
                        txtDiv.setAttribute("id", txtDivId);
                        txtDiv.setAttribute("class", "thumbData");
                        document.getElementById(nthTextId).appendChild(txtDiv);

                        var nodeImage = document.createElement("img")
                        nodeImage.setAttribute("src", "img/txt_thumb.svg");
                        nodeImage.setAttribute("width", "80px");
                        nodeImage.setAttribute("height", "100px");
                        document.getElementById(txtDivId).appendChild(nodeImage);

                        showDetail(nthTextId, attachFileName_origin, attachFileSize, displayExt, fromEmailAddr, detailDate);

                        document.getElementById(nthTextId).addEventListener("click", displayDetailText);

                        function displayDetailText() {

                            document.getElementById("dateSlider").style.zIndex = "0";
                            var modal = document.getElementById("myModal");
                            modal.style.display = "block";
                            var nodeSection = document.createElement("div");
                            nodeSection.setAttribute("id", "modalText");
                            var nodeImage = document.createElement("img");
                            nodeImage.setAttribute("src", "img/txt_thumb.svg");
                            nodeImage.setAttribute("width", "120px");
                            nodeImage.setAttribute("height", "150px");
                            nodeSection.appendChild(nodeImage);


                            document.getElementsByClassName("modal-content")[0].appendChild(nodeSection);
                            var nodeBr = document.createElement("br");
                            showDetail("modalText", attachFileName_origin, attachFileSize, displayExt, fromEmailAddr, detailDate);

                            document.getElementById("viewEmail").addEventListener("click", viewEmailWindow);
                            document.getElementById("downloadAttach").addEventListener("click", downloadFunc);
                            document.getElementById("deleteAttach").addEventListener("click", deleteAttachment);
                            document.getElementById("closeSpan").addEventListener("click", closeModalFunc);
                        }

                        function downloadFunc() {
                            document.getElementById("downloadAttach").removeEventListener("click", downloadFunc);
                            downloadFile(blob, attachFileName_origin);
                        }
                        function viewEmailWindow() {
                            document.getElementById("viewEmail").removeEventListener("click", viewEmailWindow);
                            emailUrl += emailId;
                            window.open(emailUrl, '_blank', params);
                            emailUrl = emailUrl.replace(emailId, "");
                        }
                    }
                    break;

                case 'videoFormat':

                    if (nameFlag || emailFlag || subjectFlag || fileNameFlag || generalFlag || extensionFlag) {

                        var node = document.createElement("div");
                        var nthVideoId = "video" + nth;
                        node.setAttribute("id", nthVideoId);
                        node.setAttribute("class", 'videoFormat');
                        document.getElementById("thumbnail").appendChild(node);

                        var videoIconDiv = document.createElement("div");
                        var videoIconDivId = "icon" + nthVideoId;
                        videoIconDiv.setAttribute("id", videoIconDivId);
                        videoIconDiv.setAttribute("class", "iconSvg");
                        document.getElementById(nthVideoId).appendChild(videoIconDiv);

                        var nodeVideoIcon = document.createElement("img")
                        nodeVideoIcon.setAttribute("src", "img/video_icon.svg");
                        nodeVideoIcon.setAttribute("width", "30px");
                        nodeVideoIcon.setAttribute("height", "30px");
                        document.getElementById(videoIconDivId).appendChild(nodeVideoIcon);

                        var videoDiv = document.createElement("div");
                        var videoDivId = "div" + nthVideoId;
                        videoDiv.setAttribute("id", videoDivId);
                        videoDiv.setAttribute("class", "thumbData");
                        document.getElementById(nthVideoId).appendChild(videoDiv);

                        var nodeImage = document.createElement("img")
                        nodeImage.setAttribute("src", "img/video_thumb.svg");
                        nodeImage.setAttribute("width", "80px");
                        nodeImage.setAttribute("height", "100px");
                        document.getElementById(videoDivId).appendChild(nodeImage);


                        showDetail(nthVideoId, attachFileName_origin, attachFileSize, displayExt, fromEmailAddr, detailDate);

                        document.getElementById(nthVideoId).addEventListener("click", displayDetailVideo);

                        function displayDetailVideo() {

                            document.getElementById("dateSlider").style.zIndex = "0";
                            var modal = document.getElementById("myModal");
                            modal.style.display = "block";
                            var nodeSection = document.createElement("div");
                            nodeSection.setAttribute("id", "modalVideo");
                            var nodeImage = document.createElement("img");
                            nodeImage.setAttribute("src", "img/video_icon.svg");
                            nodeImage.setAttribute("width", "120px");
                            nodeImage.setAttribute("height", "150px");
                            nodeSection.appendChild(nodeImage);

                            document.getElementsByClassName("modal-content")[0].appendChild(nodeSection);

                            var nodeBr = document.createElement("br");
                            showDetail("modalVideo", attachFileName_origin, attachFileSize, displayExt, fromEmailAddr, detailDate);

                            document.getElementById("viewEmail").addEventListener("click", viewEmailWindow);
                            document.getElementById("downloadAttach").addEventListener("click", downloadFunc);
                            document.getElementById("deleteAttach").addEventListener("click", deleteAttachment);
                            document.getElementById("closeSpan").addEventListener("click", closeModalFunc);
                        }

                        function downloadFunc() {
                            document.getElementById("downloadAttach").removeEventListener("click", downloadFunc);
                            downloadFile(blob, attachFileName_origin);
                        }
                        function viewEmailWindow() {
                            document.getElementById("viewEmail").removeEventListener("click", viewEmailWindow);
                            emailUrl += emailId;
                            window.open(emailUrl, '_blank', params);
                            emailUrl = emailUrl.replace(emailId, "");
                        }
                    }

                    break;

                case 'musicFormat':

                    if (nameFlag || emailFlag || subjectFlag || fileNameFlag || generalFlag || extensionFlag) {

                        var node = document.createElement("div");
                        var nthMusicId = "music" + nth;
                        node.setAttribute("id", nthMusicId);
                        node.setAttribute("class", 'musicFormat');
                        document.getElementById("thumbnail").appendChild(node);

                        var musicIconDiv = document.createElement("div");
                        var musicIconDivId = "icon" + nthMusicId;
                        musicIconDiv.setAttribute("id", musicIconDivId);
                        musicIconDiv.setAttribute("class", "iconSvg");
                        document.getElementById(nthMusicId).appendChild(musicIconDiv);

                        var nodeMusicIcon = document.createElement("img")
                        nodeMusicIcon.setAttribute("src", "img/music_icon.svg");
                        nodeMusicIcon.setAttribute("width", "30px");
                        nodeMusicIcon.setAttribute("height", "30px");
                        document.getElementById(musicIconDivId).appendChild(nodeMusicIcon);

                        var musicDiv = document.createElement("div");
                        var musicDivId = "div" + nthMusicId;
                        musicDiv.setAttribute("id", musicDivId);
                        musicDiv.setAttribute("class", "thumbData");
                        document.getElementById(nthMusicId).appendChild(musicDiv);

                        var nodeImage = document.createElement("img")
                        nodeImage.setAttribute("src", "img/mp3_thumb.svg");
                        nodeImage.setAttribute("width", "80px");
                        nodeImage.setAttribute("height", "100px");
                        document.getElementById(musicDivId).appendChild(nodeImage);

                        showDetail(nthMusicId, attachFileName_origin, attachFileSize, displayExt, fromEmailAddr, detailDate);

                        document.getElementById(nthMusicId).addEventListener("click", displayDetailMusic);

                        function displayDetailMusic() {

                            document.getElementById("dateSlider").style.zIndex = "0";
                            var modal = document.getElementById("myModal");
                            modal.style.display = "block";
                            var nodeSection = document.createElement("div");
                            nodeSection.setAttribute("id", "modalMusic");
                            var nodeImage = document.createElement("img");
                            nodeImage.setAttribute("src", "img/mp3_thumb.svg");
                            nodeImage.setAttribute("width", "120px");
                            nodeImage.setAttribute("height", "150px");
                            nodeSection.appendChild(nodeImage);

                            document.getElementsByClassName("modal-content")[0].appendChild(nodeSection);
                            var nodeBr = document.createElement("br");
                            showDetail("modalMusic", attachFileName_origin, attachFileSize, displayExt, fromEmailAddr, detailDate);

                            document.getElementById("viewEmail").addEventListener("click", viewEmailWindow);
                            document.getElementById("downloadAttach").addEventListener("click", downloadFunc);
                            document.getElementById("deleteAttach").addEventListener("click", deleteAttachment);
                            document.getElementById("closeSpan").addEventListener("click", closeModalFunc);
                        }

                        function downloadFunc() {
                            document.getElementById("downloadAttach").removeEventListener("click", downloadFunc);
                            downloadFile(blob, attachFileName_origin);
                        }
                        function viewEmailWindow() {
                            document.getElementById("viewEmail").removeEventListener("click", viewEmailWindow);
                            emailUrl += emailId;
                            window.open(emailUrl, '_blank', params);
                            emailUrl = emailUrl.replace(emailId, "");
                        }

                    }

                    break;

                case 'otherFormat':

                    if (nameFlag || emailFlag || subjectFlag || fileNameFlag || generalFlag || extensionFlag) {

                        var node = document.createElement("div");
                        var nthOtherId = "other" + nth;
                        node.setAttribute("id", nthOtherId);
                        node.setAttribute("class", 'otherFormat');
                        document.getElementById("thumbnail").appendChild(node);

                        var otherIconDiv = document.createElement("div");
                        var otherIconDivId = "icon" + nthOtherId;
                        otherIconDiv.setAttribute("id", otherIconDivId);
                        otherIconDiv.setAttribute("class", "iconSvg");
                        document.getElementById(nthOtherId).appendChild(otherIconDiv);

                        var nodeOtherIcon = document.createElement("img")
                        nodeOtherIcon.setAttribute("src", "img/general_icon.png");
                        nodeOtherIcon.setAttribute("width", "30px");
                        nodeOtherIcon.setAttribute("height", "30px");
                        document.getElementById(otherIconDivId).appendChild(nodeOtherIcon);

                        var otherDiv = document.createElement("div");
                        var otherDivId = "div" + nthOtherId;
                        otherDiv.setAttribute("id", otherDivId);
                        otherDiv.setAttribute("class", "thumbData");
                        document.getElementById(nthOtherId).appendChild(otherDiv);

                        var nodeImage = document.createElement("img")
                        nodeImage.setAttribute("src", "img/general_file.svg");
                        nodeImage.setAttribute("width", "80px");
                        nodeImage.setAttribute("height", "100px");
                        document.getElementById(otherDivId).appendChild(nodeImage);

                        showDetail(nthOtherId, attachFileName_origin, attachFileSize, displayExt, fromEmailAddr, detailDate);

                        document.getElementById(nthOtherId).addEventListener("click", displayDetailOther);

                        function displayDetailOther() {

                            document.getElementById("dateSlider").style.zIndex = "0";
                            var modal = document.getElementById("myModal");
                            modal.style.display = "block";
                            var nodeSection = document.createElement("div");
                            nodeSection.setAttribute("id", "modalOther");
                            var nodeImage = document.createElement("img");
                            nodeImage.setAttribute("src", "img/general_file.svg");
                            nodeImage.setAttribute("width", "120px");
                            nodeImage.setAttribute("height", "150px");
                            nodeSection.appendChild(nodeImage);

                            document.getElementsByClassName("modal-content")[0].appendChild(nodeSection);
                            var nodeBr = document.createElement("br");
                            showDetail("modalOther", attachFileName_origin, attachFileSize, displayExt, fromEmailAddr, detailDate);

                            document.getElementById("viewEmail").addEventListener("click", viewEmailWindow);
                            document.getElementById("downloadAttach").addEventListener("click", downloadFunc);
                            document.getElementById("deleteAttach").addEventListener("click", deleteAttachment);
                            document.getElementById("closeSpan").addEventListener("click", closeModalFunc);
                        }
                        function downloadFunc() {
                            document.getElementById("downloadAttach").removeEventListener("click", downloadFunc);
                            downloadFile(blob, attachFileName_origin);
                        }
                        function viewEmailWindow() {
                            document.getElementById("viewEmail").removeEventListener("click", viewEmailWindow);
                            emailUrl += emailId;
                            window.open(emailUrl, '_blank', params);
                            emailUrl = emailUrl.replace(emailId, "");
                        }
                    }
                    break;
            }
            resolve("success");

        }).catch((error) => {
            window.alert("falied....")
            console.log(error)
        });
    });

}

function closeModalFunc() {

    if (document.getElementById("modalImage")) {
        document.getElementById("modalImage").remove();
    }
    if (document.getElementById("modalPdf")) {
        document.getElementById("modalPdf").remove();
    }
    if (document.getElementById("modalWord")) {
        document.getElementById("modalWord").remove();
    }
    if (document.getElementById("modalText")) {
        document.getElementById("modalText").remove();
    }
    if (document.getElementById("modalVideo")) {
        document.getElementById("modalVideo").remove();
    }
    if (document.getElementById("modalMusic")) {
        document.getElementById("modalMusic").remove();
    }
    if (document.getElementById("modalOther")) {
        document.getElementById("modalOther").remove();
    }
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
}

function showPDF(pdf_url, newPdfContentId, __CANVAS, __CANVAS_CTX) {

    PDFJS.getDocument({ url: pdf_url }).then(function (pdf_doc) {
        __PDF_DOC = pdf_doc;
        __TOTAL_PAGES = __PDF_DOC.numPages;

        $("#" + newPdfContentId).show();
        // Show the first page
        showPage(1, __CANVAS, __CANVAS_CTX);
    }).catch(function (error) {
        alert(error.message);
    });
}

function showPage(page_no, __CANVAS, __CANVAS_CTX) {

    __PAGE_RENDERING_IN_PROGRESS = 1;
    __CURRENT_PAGE = page_no;

    // Fetch the page
    __PDF_DOC.getPage(page_no).then(function (page) {
        // As the canvas is of a fixed width we need to set the scale of the viewport accordingly
        var scale_required = __CANVAS.width / page.getViewport(1).width;

        // Get viewport of the page at required scale
        var viewport = page.getViewport(scale_required);

        // Set canvas height

        let thumbHeight = viewport.height;
        if (thumbHeight < 100) {
            __CANVAS.height = 100
        } else {
            __CANVAS.height = thumbHeight;
        }
        var renderContext = {
            canvasContext: __CANVAS_CTX,
            viewport: viewport
        };

        // Render the page contents in the canvas
        page.render(renderContext).then(function () {
            __PAGE_RENDERING_IN_PROGRESS = 0;

        });
    });
}

function showDetail(nthItemId, attachFileName_origin, attachFileSize, displayExt, fromEmailAddr, detailDate) {

    var nodeDetailDiv = document.createElement("div");
    var nodeDetailDivId = "divDetail" + nthItemId;
    nodeDetailDiv.setAttribute("id", nodeDetailDivId);
    nodeDetailDiv.setAttribute("class", "detailData");
    document.getElementById(nthItemId).appendChild(nodeDetailDiv);

    var nodeDetail = document.createElement("LI");
    nodeDetail.setAttribute("class", "fileName");
    var nodeTextName = document.createTextNode(attachFileName_origin);
    nodeDetail.appendChild(nodeTextName);
    document.getElementById(nodeDetailDivId).appendChild(nodeDetail);

    var size_ext = displayExt + " " + attachFileSize;

    var nodeDetail = document.createElement("LI");
    var nodeTextEmailAddr = document.createTextNode(fromEmailAddr);
    nodeDetail.appendChild(nodeTextEmailAddr);
    document.getElementById(nodeDetailDivId).appendChild(nodeDetail);

    var nodeDetail = document.createElement("LI");
    if (displayExt == "PNG" || displayExt == "JPG") {
        nodeDetail.setAttribute("class", "date_extension_image");
    } else if (displayExt == "PDF") {
        nodeDetail.setAttribute("class", "date_extension_pdf");
    } else if (displayExt == "MP3") {
        nodeDetail.setAttribute("class", "date_extension_mp3");
    } else if (displayExt == "MP4" || displayExt == "AVI") {
        nodeDetail.setAttribute("class", "date_extension_video");
    } else if (displayExt == "TXT") {
        nodeDetail.setAttribute("class", "date_extension_txt");
    } else if (displayExt == "DOCX" || displayExt == "DOC") {
        nodeDetail.setAttribute("class", "date_extension_doc");
    } else {
        nodeDetail.setAttribute("class", "date_extension_other");
    }
    var nodeTextEmailAddr = document.createTextNode(size_ext);
    nodeDetail.appendChild(nodeTextEmailAddr);
    document.getElementById(nodeDetailDivId).appendChild(nodeDetail);

    var nodeDetail = document.createElement("LI");
    var nodeTextEmailAddr = document.createTextNode(detailDate);
    nodeDetail.appendChild(nodeTextEmailAddr);
    document.getElementById(nodeDetailDivId).appendChild(nodeDetail);

    var nodeBr = document.createElement("br");
    document.getElementById(nodeDetailDivId).appendChild(nodeBr);
}

const downloadFile = (blob, fileName) => {

    const link = document.createElement('a');
    // create a blobURI pointing to our Blob
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    // some browser needs the anchor to be in the doc
    document.body.append(link);
    link.click();
    link.remove();
    // in case the Blob uses a lot of memory
    window.addEventListener('focus', e => URL.revokeObjectURL(link.href), { once: true });
};

function deleteAttachment() {


    // var email = GmailApp.getMessageById("1701ad5176308691").getRawContent();

    // // Find the end boundary of html or plain-text email
    // var re_html = /(-*\w*)(\r)*(\n)*(?=Content-Type: text\/html;)/.exec(email);
    // var re = re_html || /(-*\w*)(\r)*(\n)*(?=Content-Type: text\/plain;)/.exec(email);

    // // Find the index of the end of message boundary
    // var start = re[1].length + re.index;
    // var boundary = email.indexOf(re[1], start);

    // // Remove the attachments & Encode the attachment-free RFC 2822 formatted email string
    // var base64_encoded_email = Utilities.base64EncodeWebSafe(email.substr(0, boundary));
    // // Set the base64Encoded string to the `raw` required property
    // var resource = {'raw': base64_encoded_email}

    // // Re-insert the email into the user gmail account with the insert time
    // /* var response = Gmail.Users.Messages.insert(resource, 'me'); */

    // // Re-insert the email with the original date/time 

    // var response = Gmail.Users.Messages.insert(resource, 'me', 
    //                     null, {'internalDateSource': 'dateHeader'});

}

	// fetch(url, {
	// 	method: 'GET',
	// 	headers: {
	// 		Authorization: 'Bearer ' + token
	// 	}
	// }).then((res) => {
	// 	return res.json();
	// }).then(function (obj) {
	// 	console.log('obj result is here', obj);		
	// 	console.log("here comes the nextpageTOken", obj.nextPageToken);

	// 	chrome.runtime.sendMessage({
	// 		from: "background", 
	// 		data: obj,
	// 		token: g_token,
	// 		action: 'list'
	// 	});
    // });



