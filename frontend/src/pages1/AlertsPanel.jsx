import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/card.jsx';
import { Badge } from '../components/badge.jsx';
import { Button } from '../components/button.jsx';
import { ScrollArea } from '../components/scroll-area.jsx';
import { 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  MapPin, 
  Bell, 
  BellOff,
  Filter,
  Search,
  X,
  Zap,
  Wifi,
  Battery,
  Thermometer,
  Users,
  Package
} from 'lucide-react';
import { Input } from '../components/input.jsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/select.jsx';

const mockAlerts = [
  {
    id: 'A001',
    type: 'critical',
    title: 'Node N003 Offline',
    description: 'Primary mesh node has lost connectivity. Automatic failover initiated.',
    location: 'Sector 7, Grid B3',
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    acknowledged: false,
    category: 'network',
    icon: Wifi,
    priority: 10
  },
  {
    id: 'A002',
    type: 'warning',
    title: 'Low Battery Alert',
    description: 'Multiple nodes reporting battery levels below 30%. Maintenance required.',
    location: 'Sector 12, Grid A1-A3',
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    acknowledged: false,
    category: 'system',
    icon: Battery,
    priority: 7
  },
  {
    id: 'A003',
    type: 'critical',
    title: 'Extreme Weather Detected',
    description: 'Wind speeds exceeding 45 mph. Network stability at risk.',
    location: 'Region North',
    timestamp: new Date(Date.now() - 1000 * 60 * 8),
    acknowledged: false,
    category: 'environmental',
    icon: Thermometer,
    priority: 9
  },
  {
    id: 'A004',
    type: 'warning',
    title: 'Medical Supplies Low',
    description: 'Emergency medical kit levels below threshold at Station Alpha.',
    location: 'Station Alpha',
    timestamp: new Date(Date.now() - 1000 * 60 * 25),
    acknowledged: true,
    category: 'resource',
    icon: Package,
    priority: 6
  },
  {
    id: 'A005',
    type: 'info',
    title: 'Team Bravo Checked In',
    description: 'Rescue team has confirmed safe arrival at designated coordinates.',
    location: 'Checkpoint Delta',
    timestamp: new Date(Date.now() - 1000 * 60 * 3),
    acknowledged: false,
    category: 'team',
    icon: Users,
    priority: 3
  },
  {
    id: 'A006',
    type: 'warning',
    title: 'Network Congestion',
    description: 'High traffic detected on primary mesh routes. Performance may be affected.',
    location: 'Central Hub',
    timestamp: new Date(Date.now() - 1000 * 60 * 12),
    acknowledged: false,
    category: 'network',
    icon: Zap,
    priority: 5
  }
];

export function AlertsPanel() {
  const [alerts, setAlerts] = useState(mockAlerts);
  const [filter, setFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const unread = alerts.filter(alert => !alert.acknowledged).length;
    setUnreadCount(unread);
  }, [alerts]);

  const filteredAlerts = alerts
    .filter(alert => {
      if (filter !== 'all' && alert.type !== filter) return false;
      if (categoryFilter !== 'all' && alert.category !== categoryFilter) return false;
      if (searchTerm && !alert.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
          !alert.description.toLowerCase().includes(searchTerm.toLowerCase())) return false;
      return true;
    })
    .sort((a, b) => b.priority - a.priority || b.timestamp.getTime() - a.timestamp.getTime());

  const acknowledgeAlert = (alertId) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, acknowledged: true } : alert
    ));
  };

  const dismissAlert = (alertId) => {
    setAlerts(prev => prev.filter(alert => alert.id !== alertId));
  };

  const getAlertBadgeVariant = (type) => {
    switch (type) {
      case 'critical': return 'destructive';
      case 'warning': return 'secondary';
      case 'info': return 'default';
      default: return 'default';
    }
  };

  const getAlertColor = (type) => {
    switch (type) {
      case 'critical': return 'var(--color-emergency)';
      case 'warning': return '#F77F00';
      case 'info': return 'var(--color-trust)';
      default: return 'gray';
    }
  };

  const formatRelativeTime = (date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1>Alert Management</h1>
          <p className="text-muted-foreground">
            Real-time notifications and system alerts
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setNotificationsEnabled(!notificationsEnabled)}
            className="gap-2"
          >
            {notificationsEnabled ? <Bell className="h-4 w-4" /> : <BellOff className="h-4 w-4" />}
            {notificationsEnabled ? 'Notifications On' : 'Notifications Off'}
          </Button>
          {unreadCount > 0 && (
            <Badge variant="destructive" className="px-2 py-1">
              {unreadCount} unread
            </Badge>
          )}
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search alerts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="warning">Warning</SelectItem>
                <SelectItem value="info">Info</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="network">Network</SelectItem>
                <SelectItem value="environmental">Environmental</SelectItem>
                <SelectItem value="resource">Resource</SelectItem>
                <SelectItem value="team">Team</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Alerts Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full flex items-center justify-center" 
                 style={{ backgroundColor: 'var(--color-emergency)', opacity: 0.1 }}>
              <AlertTriangle className="h-4 w-4" style={{ color: 'var(--color-emergency)' }} />
            </div>
            <div>
              <div className="text-2xl font-bold" style={{ color: 'var(--color-emergency)' }}>
                {alerts.filter(a => a.type === 'critical' && !a.acknowledged).length}
              </div>
              <div className="text-sm text-muted-foreground">Critical</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full flex items-center justify-center" 
                 style={{ backgroundColor: '#F77F00', opacity: 0.1 }}>
              <AlertTriangle className="h-4 w-4" style={{ color: '#F77F00' }} />
            </div>
            <div>
              <div className="text-2xl font-bold" style={{ color: '#F77F00' }}>
                {alerts.filter(a => a.type === 'warning' && !a.acknowledged).length}
              </div>
              <div className="text-sm text-muted-foreground">Warning</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full flex items-center justify-center" 
                 style={{ backgroundColor: 'var(--color-trust)', opacity: 0.1 }}>
              <CheckCircle className="h-4 w-4" style={{ color: 'var(--color-trust)' }} />
            </div>
            <div>
              <div className="text-2xl font-bold" style={{ color: 'var(--color-trust)' }}>
                {alerts.filter(a => a.type === 'info' && !a.acknowledged).length}
              </div>
              <div className="text-sm text-muted-foreground">Info</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full flex items-center justify-center" 
                 style={{ backgroundColor: 'var(--color-resilience)', opacity: 0.1 }}>
              <CheckCircle className="h-4 w-4" style={{ color: 'var(--color-resilience)' }} />
            </div>
            <div>
              <div className="text-2xl font-bold" style={{ color: 'var(--color-resilience)' }}>
                {alerts.filter(a => a.acknowledged).length}
              </div>
              <div className="text-sm text-muted-foreground">Resolved</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alerts List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Active Alerts ({filteredAlerts.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-96">
            <div className="space-y-1">
              {filteredAlerts.map((alert) => {
                const Icon = alert.icon;
                return (
                  <div
                    key={alert.id}
                    className={`p-4 border-l-4 hover:bg-muted/50 transition-colors ${
                      !alert.acknowledged ? 'bg-muted/20' : ''
                    }`}
                    style={{ borderLeftColor: getAlertColor(alert.type) }}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3 flex-1">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center" 
                             style={{ backgroundColor: getAlertColor(alert.type), opacity: 0.1 }}>
                          <Icon className="h-4 w-4" style={{ color: getAlertColor(alert.type) }} />
                        </div>
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold">{alert.title}</h4>
                            <Badge variant={getAlertBadgeVariant(alert.type)} className="text-xs">
                              {alert.type}
                            </Badge>
                            {!alert.acknowledged && (
                              <Badge variant="outline" className="text-xs">
                                New
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{alert.description}</p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {alert.location}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {formatRelativeTime(alert.timestamp)}
                            </div>
                            <Badge variant="outline" className="text-xs">
                              {alert.category}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {!alert.acknowledged && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => acknowledgeAlert(alert.id)}
                            className="gap-1"
                          >
                            <CheckCircle className="h-3 w-3" />
                            Acknowledge
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => dismissAlert(alert.id)}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
              {filteredAlerts.length === 0 && (
                <div className="p-8 text-center text-muted-foreground">
                  <AlertTriangle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No alerts match your current filters</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}