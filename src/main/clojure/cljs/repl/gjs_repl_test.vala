/* const Gio = imports.gi.Gio;
const stop_char = "\0";
const PORT = 5001;

try {
  print("1\n");
  let client = new Gio.SocketClient(),
      connection = client.connect(Gio.InetSocketAddress.new_from_string ("127.0.0.1", PORT), null),
      output = connection.output_stream,
      input = new Gio.DataInputStream({base_stream: connection.input_stream});

  print("2\n");
  while(true) {
    print("gjs_repl_test> ");
    let js = stdin.read_line();
    if (js != null) {
      output.write(js + stop_char);
      let [result, length] = input.read_until(stop_char, null);
      print("=> " + result + "\n");
    }
  }
} catch (error) {
  printerr(error.message + "\n");
}
 */

const int PORT = 5001;
const string STOP_CHAR = "\0";

void main () {
    try {
        var client = new SocketClient ();
        var connection = client.connect (new InetSocketAddress.from_string ("127.0.0.1", PORT));
		var output = new DataOutputStream(connection.output_stream);
		var input = new DataInputStream(connection.input_stream);

		while(true) {
			print("gjs_repl_test> ");
			string? js = stdin.read_line();
			print(@"Read: $js\n");
			if (js != null) {
				print("Sending...\n");
				output.put_string(js + STOP_CHAR);
				print("Sent!\n");
				size_t length;
				print("Waiting for result...\n");
				var result = input.read_until(STOP_CHAR, out length);
				print("Result received!\n");
				print(@"=> $result\n");
			} else {
				print("js is null :(\n");
			}
		}

    } catch (Error e) {
        stderr.printf ("%s\n", e.message);
    }
}
