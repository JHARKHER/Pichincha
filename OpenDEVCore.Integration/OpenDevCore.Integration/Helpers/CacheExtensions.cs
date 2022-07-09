using System;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Caching.Distributed;
using Newtonsoft.Json;

namespace OpenDEVCore.Integration.Helpers
{
    public static class CacheExtensions
    {
        public static async Task<T> GetOrAddAsync<T>(this IDistributedCache cache, string key, Func<Task<T>> addItemFactory, DistributedCacheEntryOptions options = null)
        {
            if (cache == null) throw new ArgumentNullException(nameof(cache));

            if (options == null) options = new DistributedCacheEntryOptions();

            var value = await cache.GetAsync(key);

            if (value != null)
                return JsonConvert.DeserializeObject<T>(Encoding.UTF8.GetString(value));

            var result = await addItemFactory();
            await cache.SetAsync(key, Encoding.UTF8.GetBytes(JsonConvert.SerializeObject(result)), options);
            return result;
        }
    }
}
