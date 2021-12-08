
export async function RegisterSW()
{
	console.log("Registering service worker...");
	
	try {
		const reg = await navigator.serviceWorker.register("sw.js", {
			scope: "./"
		});
		console.info("Registered service worker on " + reg.scope);
	}
	catch (err)
	{
		console.warn("Failed to register service worker: ", err);
	}
}

// For timing out if the service worker does not respond.
// Note to avoid always breaking in the debugger with "Pause on caught exceptions enabled",
// it also returns a cancel function in case of success.
export function RejectAfterTimeout(ms, message)
{
	let timeoutId = -1;
	const promise = new Promise((resolve, reject) =>
	{
		timeoutId = self.setTimeout(() => reject(message), ms);
	});
	const cancel = (() => self.clearTimeout(timeoutId));
	return { promise, cancel };
}

export async function WaitForSWReady()
{
	// If there is no controller service worker, wait for up to 4 seconds for the Service Worker to complete initialisation.
	if (navigator.serviceWorker && !navigator.serviceWorker.controller)
	{
		// Create a promise that resolves when the "controllerchange" event fires.
		const controllerChangePromise = new Promise(resolve =>
			navigator.serviceWorker.addEventListener("controllerchange", resolve, { once: true }));
		
		// Race with a 4-second timeout.
		const timeout = RejectAfterTimeout(4000, "SW ready timeout");
		
		await Promise.race([
			controllerChangePromise,
			timeout.promise
		]);
		
		// Did not reject due to timeout: cancel the rejection to avoid breaking in debugger
		timeout.cancel();
	}
}

export function PostToSW(o)
{
	navigator.serviceWorker.controller.postMessage(o);
}

const idbkvStore = IDBKeyVal.createStore("host-page", "host-store");

export function storageSet(key, val)
{
	return IDBKeyVal.set(key, val, idbkvStore);
}

export function storageGet(key)
{
	return IDBKeyVal.get(key, idbkvStore);
}

export function storageDelete(key)
{
	return IDBKeyVal.del(key, idbkvStore);
}

// File System Access API mini-polyfill for reading from webkitdirectory file list
class FakeFile {
	constructor(file)
	{
		this.kind = "file";
		this._file = file;
	}
	
	async getFile()
	{
		return this._file;
	}
}

export class FakeDirectory {
	constructor(name)
	{
		this.kind = "directory";
		this._name = name;
		
		this._folders = new Map();		// name -> FakeDirectory
		this._files = new Map();		// name -> FakeFile
	}
	
	AddOrGetFolder(name)
	{
		let ret = this._folders.get(name);
		if (!ret)
		{
			ret = new FakeDirectory(name);
			this._folders.set(name, ret);
		}
		return ret;
	}
	
	AddFile(pathStr, file)
	{
		const parts = pathStr.split("/");
		let folder = this;
		
		for (let i = 0, len = parts.length - 1 /* skip last */; i < len; ++i)
		{
			folder = folder.AddOrGetFolder(parts[i]);
		}
		
		folder._files.set(parts[parts.length - 1], new FakeFile(file));
	}
	
	HasFile(name)
	{
		return this._files.has(name);
	}
	
	// File System Access API methods
	async getDirectoryHandle(name)
	{
		const ret = this._folders.get(name);
		if (!ret)
			throw new Error("not found");
		return ret;
	}
	
	async getFileHandle(name)
	{
		const ret = this._files.get(name);
		if (!ret)
			throw new Error("not found");
		return ret;
	}
	
	async *entries()
	{
		yield* this._folders.entries();
		yield* this._files.entries();
	}
};