export type Status = "Open" | "In Progress" | "Not started yet" | "Completed" | "Claim" | "Matured" | "Claimed";

export enum StatusClass {
    "Open" = "green",
    "In Progress" = "orange",
    "Not started yet" = "gray",
    "Completed" = "gray",
    "Matured" = "gray",
    "Claimed" = "gray",
    "Claim" = "claim",
}
