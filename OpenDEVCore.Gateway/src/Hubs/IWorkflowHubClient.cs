using System.Threading.Tasks;

namespace OpenDEVCore.Gateway.DB.Hubs
{
    public interface IWorkflowHubClient
    {
        Task GLOBAL_ReceiveMessage(string name, string message);
        Task GLOBAL_NewUserConnected(string name);
        Task GLOBAL_UserDisconnected(string name);
        Task GLOBAL_assignedTask(string taskId);
        Task GLOBAL_UnassignedTask();
        Task TASKLIST_AssignedTask(string taskId);
        Task TASKLIST_UnassignedTask();
        Task TASKLIST_UpdateProcessVariable();
        Task GLOBAL_ReceiveIncident(string type, string message, string activityId, string processInstanceId);

        //CAMPANIA

        Task CAMPAIGN_File_Loaded();
        Task CAMPAIGN_Campania_Clientes();
    }
}
