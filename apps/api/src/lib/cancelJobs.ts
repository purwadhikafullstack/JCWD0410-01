import { scheduledJobs } from "node-schedule"

export const cancelJobs = (keys: string[]) => {
  keys.forEach((key) => {
    const job = scheduledJobs[key];
    if (job) {
      console.log(`Job cancelled : ${key}`);
      
      job.cancel()
    }
  })
}