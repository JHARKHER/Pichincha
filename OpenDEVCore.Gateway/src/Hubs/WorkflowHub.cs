using System;
using System.Threading.Tasks;
using Core.SignalR;
using Microsoft.AspNetCore.SignalR;

namespace OpenDEVCore.Gateway.DB.Hubs
{
    public class WorkflowHub : Hub<IWorkflowHubClient>
    {
        private readonly IWebsocketUserService _userService;
        public WorkflowHub(IWebsocketUserService userService)
        {
            _userService = userService;
        }
        public async Task SendToAllAsync(string name, string message)
        {
            await Clients.All.GLOBAL_ReceiveMessage(name, message);
        }

        public async Task AddNewUserAsync(WebsocketUserSession newUser)
        {
            newUser.connectionId = Context.ConnectionId;
            var result = _userService.Add(Context.ConnectionId, newUser);
            if (result)
                await Clients.Others.GLOBAL_NewUserConnected(newUser.fullName);
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            var disconnectedUser = _userService.Remove(Context.ConnectionId);

            if (disconnectedUser != null)
                await Clients.Others.GLOBAL_UserDisconnected(disconnectedUser.fullName);

            await base.OnDisconnectedAsync(exception);
        }
    }
}
