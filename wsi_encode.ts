const args = process.argv.slice(2);
for (const arg of args) {
	console.log('[' + arg.replace(/s/g, ' ').replace(/t/g, '\\t').replace(/n/g, '\\n') + ']');
}
