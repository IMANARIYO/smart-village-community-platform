import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, UserCheck, UserX, MapPin } from "lucide-react";

interface StatsData {
  total: number;
  active: number;
  inactive: number;
  byProvince: Record<string, number>;
}

interface LeaderStatsProps {
  stats: StatsData;
  loading?: boolean;
}

export function LeaderStats({ stats, loading }: LeaderStatsProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <div className="h-4 bg-gray-200 rounded animate-pulse" />
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-gray-200 rounded animate-pulse" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const provincesCount = Object.keys(stats.byProvince).length;

  const statsCards = [
    {
      title: "Total Leaders",
      value: stats.total,
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Active Leaders",
      value: stats.active,
      icon: UserCheck,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Inactive Leaders",
      value: stats.inactive,
      icon: UserX,
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
    {
      title: "Provinces Covered",
      value: provincesCount,
      icon: MapPin,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {statsCards.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              {stat.title === "Active Leaders" && stats.total > 0 && (
                <Badge variant="secondary" className="mt-1">
                  {Math.round((stats.active / stats.total) * 100)}% active
                </Badge>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

export type { StatsData };