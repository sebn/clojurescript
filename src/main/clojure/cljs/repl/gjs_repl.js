const GLib = imports.gi.GLib;
const Gio = imports.gi.Gio;
const PORT = 5001;

// TODO: install source map support

try {
    let srv = new Gio.SocketService();
    srv.add_inet_port(PORT, null);

    srv.connect("incoming", function(srv, connection) {
        print("Incoming connection\n");
        print(connection);
        print(connection.get_input_stream());
        let input = new Gio.DataInputStream({base_stream: connection.get_input_stream()}),
            output = new Gio.DataOutputStream({base_stream: connection.get_output_stream()}),
            ret = null,
            err = null;

        input.read_until_async("\0", 0, null, function(input, async_read_result, user_data) {
            print("Incoming data: ");
            let [data, length, read_error] = input.read_until_finish(async_read_result);
            print(data);
            print("\n");

            if(read_error) {
                printerr(read_error.message, "\n");
                return;
            }

            try {
                ret = eval(data);
            } catch(e) {
                err = e;
            }

            if(err) {
                output.put_string(JSON.stringify({
                    status: "exception",
                    value: err.stack
                }));
            } else if(ret !== undefined && ret !== null) {
                output.put_string(JSON.stringify({
                    status: "success",
                    value: ret.toString()
                }));
            } else {
                output.put_string(JSON.stringify({
                    status: "success",
                    value: null
                }));
            }

            ret = null;
            err = null;

            output.put_string("\0");
        }, null);

        print("Disconnecting\n");
        return true;
    });

    srv.start();
    print("ClojureScript GJS REPL server listening on port", PORT);
    let loop = new GLib.MainLoop(null, false);
    loop.run();

} catch(err) {
    printerr(err.message, "\n");
}
