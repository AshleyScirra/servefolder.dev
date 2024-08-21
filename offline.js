
// Simple offline support via Service Worker
const OFFLINE_CACHE_NAME = "servefolder-dev-offline-4";

const FILE_LIST = [
	"appmanifest.json",
	"favicon.png",
	"favicon.svg",
	"idb-keyval.js",
	"index.css",
	"/",				// the root / path, alias for index.html
	"index.html",
	"index.js",
	"offline.js",
	"utils.js"
];

// Called in "install" event to save files for offline support
async function SaveFilesToOfflineCache()
{
	try {
		console.log(`[SW] Saving ${FILE_LIST.length} files for use offline...`);

		// Fetch all files in file list
		const responses = await Promise.all(FILE_LIST.map(url => fetch(url, {
			cache: "no-store"		// bypass cache
		})));

		// Check every response OK
		if (!responses.every(r => r.ok))
			throw new Error(`non-ok response`);
		
		// Open cache and write all responses to cache
		const cache = await caches.open(OFFLINE_CACHE_NAME);
		await Promise.all(responses.map((response, i) => cache.put(FILE_LIST[i], response)));
	}
	catch (err)
	{
		console.error("[SW] Failed to save files for use offline: ", err);
	}
}

// Called in "fetch" event to handle offline support
async function OfflineFetch(request)
{
	try {
		// Use cached response if available
		const cache = await caches.open(OFFLINE_CACHE_NAME);
		const cachedResponse = await cache.match(request);
		if (cachedResponse)
			return cachedResponse;
	}
	catch (err)
	{
		console.error(`[SW] Error handling offline fetch for ${request.url}: `, err);
	}

	// If no cache response or an error occurred, fall back to dispatching to network
	return fetch(request);
}