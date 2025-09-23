import { useState } from 'react';
import { Calendar, Users, AlertTriangle, Megaphone, Building, Eye, ChevronDown, ChevronUp } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { EventType, EventCategory, VillageEvent } from '@/features/events/types';

interface NewsCardProps {
  event: VillageEvent;
}

export function NewsCard({ event }: NewsCardProps) {
  const [expanded, setExpanded] = useState(false);

  const getTypeIcon = (type: EventType) => {
    switch (type) {
      case EventType.EMERGENCY:
        return <AlertTriangle className="w-4 h-4" />;
      case EventType.ANNOUNCEMENT:
        return <Users className="w-4 h-4" />;
      case EventType.ALERT:
        return <AlertTriangle className="w-4 h-4" />;
      case EventType.INVITATION:
        return <Calendar className="w-4 h-4" />;
      case EventType.UPDATE:
        return <Building className="w-4 h-4" />;
      case EventType.REMINDER:
        return <Megaphone className="w-4 h-4" />;
      default:
        return <Megaphone className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: EventType) => {
    switch (type) {
      case EventType.EMERGENCY:
        return 'bg-red-100 text-red-800 border-red-200';
      case EventType.ANNOUNCEMENT:
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case EventType.ALERT:
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case EventType.INVITATION:
        return 'bg-green-100 text-green-800 border-green-200';
      case EventType.UPDATE:
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case EventType.REMINDER:
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryIcon = (category: EventCategory) => {
    switch (category) {
      case EventCategory.VILLAGE_MEETING:
        return <Users className="w-4 h-4" />;
      case EventCategory.HEALTH_SCREENING:
        return <AlertTriangle className="w-4 h-4" />;
      case EventCategory.SCHOOL_EVENT:
        return <Building className="w-4 h-4" />;
      case EventCategory.DISASTER_PREPAREDNESS_DRILL:
        return <AlertTriangle className="w-4 h-4" />;
      default:
        return <Calendar className="w-4 h-4" />;
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className={`${getTypeColor(event.type)} flex items-center space-x-1`}>
              {getTypeIcon(event.type)}
              <span>{event.type}</span>
            </Badge>
            <Badge variant="outline" className="flex items-center space-x-1">
              {getCategoryIcon(event.category)}
              <span>{event.category}</span>
            </Badge>
            {event.type === EventType.EMERGENCY && (
              <Badge variant="destructive" className="animate-pulse">
                URGENT
              </Badge>
            )}
          </div>
          <span className="text-sm text-gray-500">
            {new Date(event.created_at).toLocaleDateString()}
          </span>
        </div>

        <h3 className="text-lg font-semibold text-gray-900 mt-2">
          {event.title}
        </h3>
      </CardHeader>

      <CardContent>
        <div className="space-y-3">
          <p className="text-gray-600 text-sm leading-relaxed">
            {expanded ? event.description : `${event.description.slice(0, 150)}${event.description.length > 150 ? '...' : ''}`}
          </p>

          {event.description.length > 150 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setExpanded(!expanded)}
              className="text-green-600 hover:text-green-700 p-0 h-auto"
            >
              {expanded ? (
                <>
                  Show Less <ChevronUp className="w-4 h-4 ml-1" />
                </>
              ) : (
                <>
                  Read More <ChevronDown className="w-4 h-4 ml-1" />
                </>
              )}
            </Button>
          )}

          <div className="flex items-center justify-between pt-2 border-t border-gray-100">
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span className="flex items-center space-x-1">
                <Eye className="w-4 h-4" />
                {/* <span>{event?.Views || 0} views</span> */}
              </span>
              {event.organizer?.person.first_name && (
                <span>
                  By {event.organizer?.person.first_name} {event.organizer?.person.last_name}
                </span>
              )}
            </div>

            {event.start_time && (
              <span className="text-sm text-gray-500 flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>{new Date(event.date).toLocaleDateString()}</span>
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}