import type { PaidLeaveType } from "@/types";

const paidLeavePercentage = (stattotal: PaidLeaveType) => {
    // Pour calculer le pourcentage, créez une fonction séparée ou un useMemo
    return (stattotal.PaidLeave! * 100) / 30;
}

export default paidLeavePercentage
