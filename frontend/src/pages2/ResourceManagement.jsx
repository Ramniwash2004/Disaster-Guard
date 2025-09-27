import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Package, 
  Users, 
  Home, 
  Zap, 
  Plus, 
  AlertTriangle, 
  CheckCircle, 
  MapPin, 
  Clock,
  Truck,
  Heart,
  Shield,
  Wrench,
  Battery,
  Fuel,
  Radio,
  Tent
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const mockResources = [
  {
    id: 'R001',
    name: 'Emergency Medical Kits',
    category: 'medical',
    quantity: 45,
    unit: 'kits',
    threshold: 20,
    location: 'Warehouse A',
    status: 'adequate',
    lastUpdated: new Date(Date.now() - 1000 * 60 * 30),
    icon: Heart
  },
  {
    id: 'R002',
    name: 'MRE Rations',
    category: 'food',
    quantity: 1200,
    unit: 'meals',
    threshold: 500,
    location: 'Storage B',
    status: 'full',
    lastUpdated: new Date(Date.now() - 1000 * 60 * 15),
    icon: Package
  },
  {
    id: 'R003',
    name: 'Portable Generators',
    category: 'equipment',
    quantity: 8,
    unit: 'units',
    threshold: 5,
    location: 'Equipment Bay',
    status: 'adequate',
    lastUpdated: new Date(Date.now() - 1000 * 60 * 45),
    icon: Zap
  },
  {
    id: 'R004',
    name: 'Diesel Fuel',
    category: 'fuel',
    quantity: 850,
    unit: 'gallons',
    threshold: 200,
    location: 'Fuel Depot',
    status: 'full',
    lastUpdated: new Date(Date.now() - 1000 * 60 * 20),
    icon: Fuel
  },
  {
    id: 'R005',
    name: 'Water Purification Tablets',
    category: 'medical',
    quantity: 15,
    unit: 'bottles',
    threshold: 50,
    location: 'Medical Supply',
    status: 'critical',
    lastUpdated: new Date(Date.now() - 1000 * 60 * 10),
    icon: Package
  },
  {
    id: 'R006',
    name: 'Satellite Phones',
    category: 'communication',
    quantity: 12,
    unit: 'devices',
    threshold: 8,
    location: 'Comm Center',
    status: 'adequate',
    lastUpdated: new Date(Date.now() - 1000 * 60 * 5),
    icon: Radio
  }
];

const mockTeams = [
  {
    id: 'T001',
    name: 'Alpha Rescue',
    type: 'rescue',
    members: 6,
    status: 'deployed',
    location: 'Sector 7',
    equipment: ['Rope', 'Medical Kit', 'Radio', 'ATV'],
    lastContact: new Date(Date.now() - 1000 * 60 * 15)
  },
  {
    id: 'T002',
    name: 'Medical Team Bravo',
    type: 'medical',
    members: 4,
    status: 'available',
    location: 'Base Camp',
    equipment: ['Trauma Kit', 'Stretcher', 'Oxygen', 'Defibrillator'],
    lastContact: new Date(Date.now() - 1000 * 60 * 5)
  },
  {
    id: 'T003',
    name: 'Logistics Charlie',
    type: 'logistics',
    members: 8,
    status: 'deployed',
    location: 'Supply Route 1',
    equipment: ['Truck', 'Forklift', 'GPS', 'Inventory Scanner'],
    lastContact: new Date(Date.now() - 1000 * 60 * 30)
  },
  {
    id: 'T004',
    name: 'Comm Delta',
    type: 'communications',
    members: 3,
    status: 'maintenance',
    location: 'Tech Hub',
    equipment: ['Satellite Uplink', 'Repeater', 'Laptop', 'Test Equipment'],
    lastContact: new Date(Date.now() - 1000 * 60 * 2)
  }
];

const mockShelters = [
  {
    id: 'S001',
    name: 'Emergency Shelter Alpha',
    type: 'temporary',
    capacity: 100,
    occupied: 87,
    location: 'Central Plaza',
    status: 'operational',
    facilities: ['Power', 'Water', 'Heating', 'Communications']
  },
  {
    id: 'S002',
    name: 'Field Hospital Beta',
    type: 'medical',
    capacity: 50,
    occupied: 23,
    location: 'Medical District',
    status: 'operational',
    facilities: ['ICU', 'Surgery', 'Pharmacy', 'Lab']
  },
  {
    id: 'S003',
    name: 'Command Center Gamma',
    type: 'permanent',
    capacity: 25,
    occupied: 18,
    location: 'Administrative Zone',
    status: 'operational',
    facilities: ['Communications', 'Power', 'Security', 'Data Center']
  }
];

export function ResourceManagement() {
  const [selectedTab, setSelectedTab] = useState('resources');

  const getStatusColor = (status) => {
    switch (status) {
      case 'critical': return 'var(--color-emergency)';
      case 'low': return '#F77F00';
      case 'adequate': return 'var(--color-trust)';
      case 'full': return 'var(--color-resilience)';
      case 'operational': return 'var(--color-resilience)';
      case 'deployed': return 'var(--color-trust)';
      case 'available': return 'var(--color-resilience)';
      case 'maintenance': return '#F77F00';
      default: return 'gray';
    }
  };

  const getStatusBadgeVariant = (status) => {
    if (status === 'critical') return 'destructive';
    if (status === 'low' || status === 'maintenance') return 'secondary';
    return 'default';
  };

  const formatRelativeTime = (date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${Math.floor(diffHours / 24)}d ago`;
  };

  const resourcesByCategory = mockResources.reduce((acc, resource) => {
    acc[resource.category] = (acc[resource.category] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(resourcesByCategory).map(([category, count]) => ({
    category: category.charAt(0).toUpperCase() + category.slice(1),
    count
  }));

  const pieData = Object.entries(resourcesByCategory).map(([category, count], index) => ({
    name: category.charAt(0).toUpperCase() + category.slice(1),
    value: count,
    color: ['var(--color-emergency)', 'var(--color-trust)', 'var(--color-resilience)', '#F77F00', '#FCBF49', '#2A9D8F'][index]
  }));

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1>Resource Management</h1>
          <p className="text-muted-foreground">
            Monitor and manage critical resources, teams, and facilities
          </p>
        </div>
        <Button className="gap-2" style={{ backgroundColor: 'var(--color-trust)' }}>
          <Plus className="h-4 w-4" />
          Add Resource
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" 
                 style={{ backgroundColor: 'var(--color-emergency)', opacity: 0.1 }}>
              <AlertTriangle className="h-5 w-5" style={{ color: 'var(--color-emergency)' }} />
            </div>
            <div>
              <div className="text-2xl font-bold" style={{ color: 'var(--color-emergency)' }}>
                {mockResources.filter(r => r.status === 'critical').length}
              </div>
              <div className="text-sm text-muted-foreground">Critical Resources</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" 
                 style={{ backgroundColor: 'var(--color-trust)', opacity: 0.1 }}>
              <Users className="h-5 w-5" style={{ color: 'var(--color-trust)' }} />
            </div>
            <div>
              <div className="text-2xl font-bold" style={{ color: 'var(--color-trust)' }}>
                {mockTeams.filter(t => t.status === 'deployed').length}
              </div>
              <div className="text-sm text-muted-foreground">Teams Deployed</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" 
                 style={{ backgroundColor: 'var(--color-resilience)', opacity: 0.1 }}>
              <Home className="h-5 w-5" style={{ color: 'var(--color-resilience)' }} />
            </div>
            <div>
              <div className="text-2xl font-bold" style={{ color: 'var(--color-resilience)' }}>
                {mockShelters.filter(s => s.status === 'operational').length}
              </div>
              <div className="text-sm text-muted-foreground">Active Shelters</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" 
                 style={{ backgroundColor: '#F77F00', opacity: 0.1 }}>
              <Zap className="h-5 w-5" style={{ color: '#F77F00' }} />
            </div>
            <div>
              <div className="text-2xl font-bold" style={{ color: '#F77F00' }}>
                {mockResources.reduce((sum, r) => r.category === 'equipment' ? sum + r.quantity : sum, 0)}
              </div>
              <div className="text-sm text-muted-foreground">Equipment Units</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
        <TabsList className="grid grid-cols-4 w-full max-w-md">
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="teams">Teams</TabsTrigger>
          <TabsTrigger value="shelters">Shelters</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="resources" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {mockResources.map((resource) => {
              const Icon = resource.icon;
              const utilizationPercent = (resource.quantity / (resource.quantity + resource.threshold)) * 100;
              
              return (
                <Card key={resource.id} className="relative overflow-hidden">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center" 
                             style={{ backgroundColor: getStatusColor(resource.status), opacity: 0.1 }}>
                          <Icon className="h-4 w-4" style={{ color: getStatusColor(resource.status) }} />
                        </div>
                        <div>
                          <CardTitle className="text-base">{resource.name}</CardTitle>
                          <p className="text-sm text-muted-foreground capitalize">{resource.category}</p>
                        </div>
                      </div>
                      <Badge variant={getStatusBadgeVariant(resource.status)}>
                        {resource.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm">Current Stock</span>
                        <span className="font-semibold">{resource.quantity} {resource.unit}</span>
                      </div>
                      <Progress 
                        value={utilizationPercent} 
                        className="h-2"
                      />
                      <div className="flex items-center justify-between text-xs text-muted-foreground mt-1">
                        <span>Threshold: {resource.threshold}</span>
                        <span>{utilizationPercent.toFixed(0)}% capacity</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        <span>{resource.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>Updated {formatRelativeTime(resource.lastUpdated)}</span>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Package className="h-3 w-3 mr-1" />
                        Restock
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MapPin className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="teams" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {mockTeams.map((team) => (
              <Card key={team.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Users className="h-5 w-5" />
                        {team.name}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground capitalize">{team.type} Team</p>
                    </div>
                    <Badge variant={getStatusBadgeVariant(team.status)}>
                      {team.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-muted-foreground">Members</div>
                      <div className="font-semibold">{team.members} personnel</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Location</div>
                      <div className="font-semibold">{team.location}</div>
                    </div>
                  </div>

                  <div>
                    <div className="text-sm text-muted-foreground mb-2">Equipment</div>
                    <div className="flex flex-wrap gap-1">
                      {team.equipment.map((item, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      Last contact: {formatRelativeTime(team.lastContact)}
                    </div>
                    <div className="flex items-center gap-1">
                      <div 
                        className="w-2 h-2 rounded-full" 
                        style={{ backgroundColor: getStatusColor(team.status) }}
                      ></div>
                      <span className="capitalize">{team.status}</span>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Radio className="h-3 w-3 mr-1" />
                      Contact
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <MapPin className="h-3 w-3 mr-1" />
                      Locate
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="shelters" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {mockShelters.map((shelter) => {
              const occupancyPercent = (shelter.occupied / shelter.capacity) * 100;
              
              return (
                <Card key={shelter.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <Home className="h-5 w-5" />
                          {shelter.name}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground capitalize">{shelter.type} Facility</p>
                      </div>
                      <Badge variant={getStatusBadgeVariant(shelter.status)}>
                        {shelter.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm">Occupancy</span>
                        <span className="font-semibold">{shelter.occupied}/{shelter.capacity}</span>
                      </div>
                      <Progress 
                        value={occupancyPercent} 
                        className="h-2"
                      />
                      <div className="text-xs text-muted-foreground mt-1">
                        {occupancyPercent.toFixed(0)}% capacity
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      <span>{shelter.location}</span>
                    </div>

                    <div>
                      <div className="text-sm text-muted-foreground mb-2">Facilities</div>
                      <div className="flex flex-wrap gap-1">
                        {shelter.facilities.map((facility, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {facility}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Users className="h-3 w-3 mr-1" />
                        Manage
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MapPin className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Resource Distribution</CardTitle>
                <p className="text-sm text-muted-foreground">Resources by category</p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3,3" />
                    <XAxis dataKey="category" />
                    <YAxis />
                    <Tooltip />
                    <Bar 
                      dataKey="count" 
                      fill="var(--color-trust)"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Resource Categories</CardTitle>
                <p className="text-sm text-muted-foreground">Distribution overview</p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}`}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Resource Status Overview</CardTitle>
              <p className="text-sm text-muted-foreground">Current status of all tracked resources</p>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Resource</th>
                      <th className="text-left p-2">Category</th>
                      <th className="text-left p-2">Status</th>
                      <th className="text-left p-2">Quantity</th>
                      <th className="text-left p-2">Location</th>
                      <th className="text-left p-2">Last Updated</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockResources.map((resource) => (
                      <tr key={resource.id} className="border-b hover:bg-muted/50">
                        <td className="p-2 font-medium">{resource.name}</td>
                        <td className="p-2 capitalize">{resource.category}</td>
                        <td className="p-2">
                          <Badge variant={getStatusBadgeVariant(resource.status)}>
                            {resource.status}
                          </Badge>
                        </td>
                        <td className="p-2">{resource.quantity} {resource.unit}</td>
                        <td className="p-2">{resource.location}</td>
                        <td className="p-2 text-muted-foreground">
                          {formatRelativeTime(resource.lastUpdated)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}