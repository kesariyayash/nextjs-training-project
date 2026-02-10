let maintenanceState = false;

export function getMaintenance() {
    return maintenanceState;
}

export function toggleMaintenance() {
    maintenanceState = !maintenanceState;
    return maintenanceState;
}