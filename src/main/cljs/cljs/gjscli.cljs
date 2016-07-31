; Projects compiled with :target :gjs have this file appended.  Its
; job is to make sure cljs.gjs is loaded and that the *main-cli-fn*
; is called with the script's command-line arguments.
(ns cljs.gjscli
  (:require [cljs.gjs :as gjs]))

;; Call the user's main function
(if (or (nil? cljs.core/*main-cli-fn*)
        (not (fn? cljs.core/*main-cli-fn*)))
  (throw (js/Error. "cljs.core/*main-cli-fn* not set"))
  (apply cljs.core/*main-cli-fn* js/ARGV))
