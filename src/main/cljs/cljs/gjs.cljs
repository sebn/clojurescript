; Projects compiled with :target :gjs can 'import' this namespace
; to get the gjs globals loaded into cljs.gjs and get
; ClojureScript's 'print' set up correctly.
(ns cljs.gjs)

(def print (js/print))
(def printerr (js/printerr))

(defn enable-util-print! []
  (set! *print-newline* false)
  (set! *print-fn*
    (fn [& args]
      (.apply print (into-array args))))
  (set! *print-err-fn*
    (fn [& args]
      (.apply printerr (into-array args))))
  nil)
