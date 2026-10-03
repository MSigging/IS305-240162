import { ICTSupportRequest } from "./ICTSupportRequest.js";
import { MaintenanceRequest } from "./MaintenanceRequest.js";
import { CleaningRequest } from "./CleaningRequest.js";
import { GeneralServiceRequest } from "./GeneralServiceRequest.js";


export class ServiceRequestFactory {

  static createFromData(savedData, users, historyEntries = []) {
    if (!savedData || typeof savedData !== "object") {
      throw new Error("ServiceRequestFactory.createFromData() requires a saved request record.");
    }

    const requester = users.find((u) => u.userId === savedData.requesterId);
    if (!requester) {
      throw new Error(
        `Cannot restore request "${savedData.requestId}": requester "${savedData.requesterId}" was not found among loaded users.`
      );
    }

    const common = {
      requestId: savedData.requestId,
      requester,
      title: savedData.title,
      description: savedData.description,
      location: savedData.location,
      priority: savedData.priority
    };

    let request;
    switch (savedData.requestType) {
      case "ICTSupportRequest":
        request = new ICTSupportRequest(common, {
          deviceType: savedData.deviceType,
          systemName: savedData.systemName,
          faultType: savedData.faultType,
          networkImpact: savedData.networkImpact
        });
        break;

      case "MaintenanceRequest":
        request = new MaintenanceRequest(common, {
          building: savedData.building,
          roomNumber: savedData.roomNumber,
          hazardLevel: savedData.hazardLevel,
          equipmentAffected: savedData.equipmentAffected
        });
        break;

      case "CleaningRequest":
        request = new CleaningRequest(common, {
          cleaningArea: savedData.cleaningArea,
          hygieneRisk: savedData.hygieneRisk,
          serviceType: savedData.serviceType,
          preferredServiceTime: savedData.preferredServiceTime
        });
        break;

      case "GeneralServiceRequest":
        request = new GeneralServiceRequest(common, {
          additionalNotes: savedData.additionalNotes
        });
        break;

      default:
        throw new Error(
          `ServiceRequestFactory cannot restore unknown requestType "${savedData.requestType}" for request "${savedData.requestId}".`
        );
    }

    // The constructor above always starts the request fresh (status
    // "Submitted", a brand new history entry, no assigned technician).
    
    request.restoreState({
      status: savedData.status,
      dateSubmitted: savedData.dateSubmitted,
      dateUpdated: savedData.dateUpdated,
      assignedTechnicianId: savedData.assignedTechnicianId,
      history: historyEntries
    });

    return request;
  }
}
