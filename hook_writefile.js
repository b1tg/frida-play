var writeFile = Module.getExportByName(null, "WriteFile");
var createFile = Module.getExportByName(null, "CreateFileW");
let handleMap = {}
Interceptor.attach(writeFile, {
	onEnter: function (args) {
		console.log(`write file: ${handleMap[args[0]]} (#${args[0]})\n`);
		let content = Memory.readUtf8String(args[1])
		console.log(`content:\n${content}`)
		console.log("--------\n");
	}
});

Interceptor.attach(createFile, {
	onEnter: function (args) {
		this.path = args[0].readUtf16String();
	},
	onLeave: function (retval) {
		handleMap[retval] = this.path;
	}
});
