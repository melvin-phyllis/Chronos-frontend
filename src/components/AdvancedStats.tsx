import { useState, useEffect } from "react";
import { BarChart3, TrendingUp, Users, ClipboardList, MessageSquare, Calendar, DollarSign, UserCheck, Clock, CheckCircle } from "lucide-react";
import axios from "axios";
import Chart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";

interface MonthlyPresence {
    month: string;
    year: number;
    count: number;
    rate: number;
}

interface LeaveType {
    label: string;
    count: number;
    jours: number;
}

interface SurveyResult {
    titre: string;
    statut: string;
    responses: number;
    participationRate: number;
}

interface DashboardStats {
    totalEmployees: number;
    presentToday: number;
    onLeaveToday: number;
    pendingLeaves: number;
    payrollTotal: number;
    tasksEnCours: number;
    tasksAValider: number;
    tasksValidees: number;
    tasksRejetees: number;
    activeSurveys: number;
    totalSurveys: number;
    totalResponses: number;
    participationRate: number;
    monthlyPresence: MonthlyPresence[];
    leaveTypes: Record<string, LeaveType>;
    progressionDistribution: Record<string, number>;
    surveyResults: SurveyResult[];
}

const AdvancedStats = () => {
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/stats/dashboard`, { withCredentials: true });
            if (res.data.success) setStats(res.data.data);
        } catch (error) {
            console.error("Error fetching stats", error);
        } finally {
            setLoading(false);
        }
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(amount);
    };

    // 1. Taux de présence mensuel - Line/Area Chart
    const monthlyPresenceOptions: ApexOptions = {
        chart: { type: 'area', toolbar: { show: false }, zoom: { enabled: false } },
        stroke: { curve: 'smooth', width: 3 },
        fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.5, opacityTo: 0.1, stops: [0, 100] } },
        colors: ['#8B5CF6'],
        xaxis: {
            categories: stats?.monthlyPresence?.map(m => m.month) || [],
            labels: { style: { fontSize: '12px', fontWeight: 500 } }
        },
        yaxis: {
            labels: { formatter: (val) => `${val}%` },
            max: 100
        },
        tooltip: {
            y: { formatter: (val) => `${val}%` }
        },
        dataLabels: { enabled: false },
        grid: { borderColor: '#E5E7EB', strokeDashArray: 4 }
    };
    const monthlyPresenceSeries = [{
        name: 'Taux de présence',
        data: stats?.monthlyPresence?.map(m => m.rate) || []
    }];

    // 2. Progression des tâches - Bar Chart
    const taskProgressOptions: ApexOptions = {
        chart: { type: 'bar', toolbar: { show: false } },
        plotOptions: {
            bar: {
                horizontal: true,
                borderRadius: 6,
                distributed: true,
                dataLabels: { position: 'center' }
            }
        },
        colors: ['#EF4444', '#F59E0B', '#FBBF24', '#34D399', '#10B981'],
        xaxis: {
            categories: ['0-25%', '25-50%', '50-75%', '75-99%', '100%'],
            labels: { style: { fontSize: '12px' } }
        },
        dataLabels: {
            enabled: true,
            style: { fontSize: '14px', fontWeight: 600, colors: ['#fff'] }
        },
        legend: { show: false },
        grid: { borderColor: '#E5E7EB' }
    };
    const taskProgressSeries = [{
        name: 'Tâches',
        data: stats ? [
            stats.progressionDistribution['0-25'],
            stats.progressionDistribution['25-50'],
            stats.progressionDistribution['50-75'],
            stats.progressionDistribution['75-100'],
            stats.progressionDistribution['100']
        ] : []
    }];

    // 3. Répartition des congés - Donut Chart
    const leaveDistributionOptions: ApexOptions = {
        chart: { type: 'donut' },
        labels: stats ? Object.values(stats.leaveTypes).map(l => l.label) : [],
        colors: ['#3B82F6', '#EF4444', '#F59E0B', '#8B5CF6'],
        legend: { position: 'bottom', fontSize: '13px' },
        plotOptions: {
            pie: {
                donut: {
                    size: '65%',
                    labels: {
                        show: true,
                        total: {
                            show: true,
                            label: 'Total jours',
                            fontSize: '14px',
                            fontWeight: 600,
                            color: '#1F2937',
                            formatter: () => stats ? Object.values(stats.leaveTypes).reduce((a, b) => a + b.jours, 0).toString() : '0'
                        }
                    }
                }
            }
        },
        dataLabels: { enabled: false },
        responsive: [{ breakpoint: 480, options: { chart: { width: '100%' } } }]
    };
    const leaveDistributionSeries = stats ? Object.values(stats.leaveTypes).map(l => l.jours) : [];

    // 4. Résultats des sondages - Radial Bar Chart
    const surveyResultsOptions: ApexOptions = {
        chart: { type: 'radialBar' },
        plotOptions: {
            radialBar: {
                offsetY: 0,
                startAngle: 0,
                endAngle: 270,
                hollow: { size: '30%' },
                dataLabels: {
                    name: { show: true, fontSize: '12px' },
                    value: { show: true, fontSize: '14px', fontWeight: 600, formatter: (val) => `${val}%` }
                },
                track: { background: '#E5E7EB' }
            }
        },
        colors: ['#8B5CF6', '#3B82F6', '#10B981', '#F59E0B', '#EF4444'],
        labels: stats?.surveyResults?.map(s => s.titre.slice(0, 15) + (s.titre.length > 15 ? '...' : '')) || [],
        legend: { show: true, position: 'bottom', fontSize: '12px' },
        responsive: [{ breakpoint: 480, options: { legend: { position: 'bottom' } } }]
    };
    const surveyResultsSeries = stats?.surveyResults?.map(s => s.participationRate) || [];

    // 5. Statut des tâches - Pie Chart
    const taskStatusOptions: ApexOptions = {
        chart: { type: 'pie' },
        labels: ['En cours', 'À valider', 'Validées', 'Rejetées'],
        colors: ['#3B82F6', '#F59E0B', '#10B981', '#EF4444'],
        legend: { position: 'bottom', fontSize: '13px' },
        dataLabels: {
            enabled: true,
            formatter: (val: number) => `${val.toFixed(0)}%`
        },
        responsive: [{ breakpoint: 480, options: { chart: { width: '100%' } } }]
    };
    const taskStatusSeries = stats ? [stats.tasksEnCours, stats.tasksAValider, stats.tasksValidees, stats.tasksRejetees] : [];

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin w-8 h-8 border-4 border-violet-600 border-t-transparent rounded-full" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl shadow-lg">
                    <BarChart3 className="w-8 h-8 text-white" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Statistiques & Performances</h1>
                    <p className="text-gray-500">Tableau de bord analytique RH</p>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid gap-4 grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
                <div className="bg-white rounded-2xl shadow-sm p-4 border-l-4 border-violet-500">
                    <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                        <Users className="w-4 h-4" /> Employés
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{stats?.totalEmployees}</div>
                </div>
                <div className="bg-white rounded-2xl shadow-sm p-4 border-l-4 border-emerald-500">
                    <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                        <UserCheck className="w-4 h-4" /> Présents
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{stats?.presentToday}</div>
                </div>
                <div className="bg-white rounded-2xl shadow-sm p-4 border-l-4 border-amber-500">
                    <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                        <Calendar className="w-4 h-4" /> Congés
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{stats?.onLeaveToday}</div>
                </div>
                <div className="bg-white rounded-2xl shadow-sm p-4 border-l-4 border-blue-500">
                    <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                        <ClipboardList className="w-4 h-4" /> Tâches actives
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{stats?.tasksEnCours}</div>
                </div>
                <div className="bg-white rounded-2xl shadow-sm p-4 border-l-4 border-rose-500">
                    <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                        <Clock className="w-4 h-4" /> À valider
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{stats?.tasksAValider}</div>
                </div>
                <div className="bg-white rounded-2xl shadow-sm p-4 border-l-4 border-purple-500">
                    <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                        <MessageSquare className="w-4 h-4" /> Sondages actifs
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{stats?.activeSurveys}</div>
                </div>
            </div>

            {/* Charts Grid - Row 1 */}
            <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
                {/* 1. Taux de présence mensuel */}
                <div className="bg-white rounded-2xl shadow-sm p-6 lg:col-span-2">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-violet-600" />
                        Taux de Présence Mensuel
                    </h3>
                    <Chart options={monthlyPresenceOptions} series={monthlyPresenceSeries} type="area" height={280} />
                </div>
            </div>

            {/* Charts Grid - Row 2 */}
            <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
                {/* 2. Progression des tâches */}
                <div className="bg-white rounded-2xl shadow-sm p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <ClipboardList className="w-5 h-5 text-blue-600" />
                        Progression des Tâches
                    </h3>
                    <Chart options={taskProgressOptions} series={taskProgressSeries} type="bar" height={280} />
                </div>

                {/* 3. Répartition des congés */}
                <div className="bg-white rounded-2xl shadow-sm p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-amber-600" />
                        Répartition des Congés
                    </h3>
                    <Chart options={leaveDistributionOptions} series={leaveDistributionSeries} type="donut" height={280} />
                </div>
            </div>

            {/* Charts Grid - Row 3 */}
            <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
                {/* 4. Résultats des sondages */}
                <div className="bg-white rounded-2xl shadow-sm p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <MessageSquare className="w-5 h-5 text-purple-600" />
                        Résultats des Sondages
                    </h3>
                    {stats?.surveyResults && stats.surveyResults.length > 0 ? (
                        <Chart options={surveyResultsOptions} series={surveyResultsSeries} type="radialBar" height={320} />
                    ) : (
                        <div className="flex items-center justify-center h-64 text-gray-400">
                            Aucun sondage disponible
                        </div>
                    )}
                </div>

                {/* 5. Statut des tâches */}
                <div className="bg-white rounded-2xl shadow-sm p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-emerald-600" />
                        Statut des Tâches
                    </h3>
                    <Chart options={taskStatusOptions} series={taskStatusSeries} type="pie" height={280} />
                </div>
            </div>

            {/* Payroll Card */}
            <div className="bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl shadow-lg p-6 text-white">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
                            <DollarSign className="w-5 h-5" />
                            Masse Salariale Mensuelle
                        </h3>
                        <div className="text-4xl font-bold">{formatCurrency(stats?.payrollTotal || 0)}</div>
                        <p className="text-violet-200 mt-1">Coût total des salaires</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white/10 rounded-xl p-4">
                            <div className="text-violet-200 text-sm">Salaire moyen</div>
                            <div className="text-xl font-bold">
                                {stats?.totalEmployees ? formatCurrency(stats.payrollTotal / stats.totalEmployees) : '€0'}
                            </div>
                        </div>
                        <div className="bg-white/10 rounded-xl p-4">
                            <div className="text-violet-200 text-sm">Effectif total</div>
                            <div className="text-xl font-bold">{stats?.totalEmployees} employés</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Survey Details Table */}
            {stats?.surveyResults && stats.surveyResults.length > 0 && (
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-gray-100">
                        <h3 className="text-lg font-bold text-gray-900">Détail des Sondages Récents</h3>
                    </div>
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Sondage</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Statut</th>
                                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase">Réponses</th>
                                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase">Participation</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {stats.surveyResults.map((survey, i) => (
                                <tr key={i} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 text-gray-900 font-medium">{survey.titre}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 text-xs font-semibold rounded-lg ${survey.statut === 'actif' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-600'
                                            }`}>
                                            {survey.statut === 'actif' ? 'Actif' : 'Clôturé'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right font-bold text-gray-900">{survey.responses}</td>
                                    <td className="px-6 py-4 text-right">
                                        <span className={`font-bold ${survey.participationRate >= 70 ? 'text-emerald-600' :
                                            survey.participationRate >= 40 ? 'text-amber-600' : 'text-rose-600'
                                            }`}>
                                            {survey.participationRate}%
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AdvancedStats;
