/**
 * Plugin to pragmatically upload files to serve using XHR
 * @author <213036@skobka.com> Soshnikov Artem
 * @url https://github.com/Doka-NT/jquery.upload5.js
 * @version 1.0
 */
(function () {
    jQuery.upload5 = function (path, file_input, callback, progress_callback, onBeforeSend) {
        var http = new XMLHttpRequest();
        if (http.upload && http.upload.addEventListener) {
            /**
             * set listener to xhr.upload.progress event
             */
            http.upload.addEventListener('progress', function (e) {
                if (e.lengthComputable) {
                    var percent = (e.loaded / e.total ) * 100;
                    if (typeof progress_callback != 'undefined')
                        progress_callback(percent, e.loaded, e.total, e);
                }
            }, false);

            /**
             * set litener on readystatechaged event
             */
            http.onreadystatechange = function () {
                if (this.readyState == 4) {
                    if (this.status == 200) {
                        if (typeof callback != 'undefined')
                            callback(this.response, this.status);
                    } else {

                    }
                }
            };

            /**
             * handle error while uploading
             */
            http.upload.addEventListener('error', function () {
                if (typeof callback != 'undefined')
                    callback(this.response, this.status);
            });
        }

        /**
         * create FormData object
         */
        var form = new FormData();
        if (file_input instanceof File) {
            form.append('file_0', file_input);
        } else {
            for (var i = 0; i < file_input.files.length; i++) {
                form.append('file_' + i, file_input.files[i]);
            }
        }

        if (typeof onBeforeSend !== 'undefined') {
            form = onBeforeSend(form);
        }

        //Sending form data via POST
        http.open('POST', path);
        http.send(form);
    };
})(jQuery);
