using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Xunit;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Threading;

namespace tests
{
    public class TestCounter
    {
        private readonly ILogger logger = TestFactory.CreateLogger();

        [Fact]
        public async Task Http_trigger_should_return_known_string()
        {
            var counter = new Company.Function.Counter { Id = "1", Count = 2 };
            var request = TestFactory.CreateHttpRequest();
            
            // Create a mock IAsyncCollector<Counter> for the function to use
            var asyncCollector = new TestAsyncCollector<Company.Function.Counter>();
            
            var response = await Company.Function.GetResumeCounter.Run(request, counter, asyncCollector, logger);
            
            // Verify the response is successful
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);

            // Deserialize the response content to Counter object
            var jsonResponse = await response.Content.ReadAsStringAsync();
            var updatedCounter = JsonConvert.DeserializeObject<Company.Function.Counter>(jsonResponse);

            // Validate the counter value
            Assert.NotNull(updatedCounter);
            Assert.Equal(3, updatedCounter.Count);
        }
    }

    // A simple mock IAsyncCollector implementation for testing purposes
    public class TestAsyncCollector<T> : IAsyncCollector<T>
    {
        public Task AddAsync(T item, CancellationToken cancellationToken = default)
        {
            return Task.CompletedTask;
        }

        public Task FlushAsync(CancellationToken cancellationToken = default)
        {
            return Task.CompletedTask;
        }
    }
}
