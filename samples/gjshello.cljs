(ns gjshello
  (:require [cljs.gjs :as gjs]))

(def Gtk (.. js/imports -gi -Gtk))

(defn -main [& args]
  (.init Gtk nil)

  (let [w (Gtk.Window. #js {:type (.. Gtk -WindowType -TOPLEVEL)
                            :title "ClojureScript"})]
    (doto w
      (.connect "destroy" #(.main_quit Gtk))
      (.show))
    (.main Gtk)))

(gjs/enable-util-print!)
(set! *main-cli-fn* -main)
