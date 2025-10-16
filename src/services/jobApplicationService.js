import { get, post, patch } from "../utils/request";

export const getJobApplications = async (userId) => {
  try {
    const response = await get(`jobApplications?userId=${userId}`);
    return response;
  } catch (error) {
    console.error("Error fetching job applications:", error);
    return null;
  }
};

export const getJobApplicationById = async (id) => {
  try {
    const response = await get(`jobApplications/${id}`);
    return response;
  } catch (error) {
    console.error("Error fetching job application:", error);
    return null;
  }
};

export const createJobApplication = async (data) => {
  try {
    const response = await post("jobApplications", data);
    return response;
  } catch (error) {
    console.error("Error creating job application:", error);
    return null;
  }
};

export const updateJobApplicationStatus = async (
  id,
  status,
  companyResponse = null
) => {
  try {
    const response = await patch(`jobApplications/${id}`, {
      status,
      companyResponse,
    });
    return response;
  } catch (error) {
    console.error("Error updating job application:", error);
    return null;
  }
};

export const getJobApplicationStats = async (userId) => {
  try {
    const applications = await get(`jobApplications?userId=${userId}`);

    const stats = {
      total: applications.length,
      pending: applications.filter((app) => app.status === "pending").length,
      reviewed: applications.filter((app) => app.status === "reviewed").length,
      accepted: applications.filter((app) => app.status === "accepted").length,
      rejected: applications.filter((app) => app.status === "rejected").length,
    };

    return stats;
  } catch (error) {
    console.error("Error fetching job application stats:", error);
    return null;
  }
};
