import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select.jsx';
import { Calendar } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { 
  FileText, 
  Download, 
  BarChart3, 
  TrendingUp, 
  Clock, 
  MapPin,
  Users,
  AlertTriangle,
  CheckCircle,
  Activity,
  Calendar as CalendarIcon,
  Filter,
  Share,
  Eye,
  Printer,
  Mail
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const mockReports = [
  {
    id: 'R001',
    title: 'Emergency Response Analysis - Q4 2024',
    type: 'operational',
    status: 'ready',
    generatedDate: new Date(Date.now() - 1000 * 60 * 60 * 2),
    period: 'Q4 2024',
    size: '2.4 MB',
    description: 'Comprehensive analysis of emergency response operations including response times, resource utilization, and outcome metrics.'
  },
  {
    id: 'R002',
    title: 'Network Performance Report',
    type: 'analytics',
    status: 'published',
    generatedDate: new Date(Date.now() - 1000 * 60 * 60 * 6),
    period: 'Last 30 Days',
    size: '1.8 MB',
    description: 'IoT mesh network performance metrics, uptime statistics, and connectivity analysis.'
  },
  {
    id: 'R003',
    title: 'Resource Utilization Summary',
    type: 'operational',
    status: 'ready',
    generatedDate: new Date(Date.now() - 1000 * 60 * 60 * 12),
    period: 'December 2024',
    size: '3.1 MB',
    description: 'Detailed breakdown of resource allocation, usage patterns, and efficiency metrics.'
  },
  {
    id: 'R004',
    title: 'Incident Response Compliance Audit',
    type: 'compliance',
    status: 'draft',
    generatedDate: new Date(Date.now() - 1000 * 60 * 60 * 18),
    period: 'Annual 2024',
    size: '4.7 MB',
    description: 'Compliance audit report covering regulatory requirements and best practice adherence.'
  }
];

// Sample data for charts
const responseTimeData = [
  { month: 'Jul', avgTime: 12, target: 15, incidents: 23 },
  { month: 'Aug', avgTime: 14, target: 15, incidents: 31 },
  { month: 'Sep', avgTime: 11, target: 15, incidents: 18 },
  { month: 'Oct', avgTime: 13, target: 15, incidents: 27 },
  { month: 'Nov', avgTime: 10, target: 15, incidents: 19 },
  { month: 'Dec', avgTime: 9, target: 15, incidents: 15 }
];

const resourceData = [
  { category: 'Medical', utilized: 87, available: 100 },
  { category: 'Transport', utilized: 92, available: 100 },
  { category: 'Communication', utilized: 78, available: 100 },
  { category: 'Shelter', utilized: 65, available: 100 },
  { category: 'Equipment', utilized: 83, available: 100 }
];

const incidentTypesData = [
  { name: 'Flood', value: 35, color: 'var(--color-emergency)' },
  { name: 'Medical Emergency', value: 28, color: 'var(--color-trust)' },
  { name: 'Equipment Failure', value: 18, color: '#F77F00' },
  { name: 'Communication Loss', value: 12, color: 'var(--color-resilience)' },
  { name: 'Other', value: 7, color: '#FCBF49' }
];

const networkUptimeData = [
  { day: 'Mon', uptime: 99.8, throughput: 89 },
  { day: 'Tue', uptime: 99.9, throughput: 92 },
  { day: 'Wed', uptime: 99.2, throughput: 87 },
  { day: 'Thu', uptime: 99.7, throughput: 91 },
  { day: 'Fri', uptime: 99.1, throughput: 85 },
  { day: 'Sat', uptime: 99.6, throughput: 88 },
  { day: 'Sun', uptime: 99.9, throughput: 93 }
];

export function Reports() {
  const [selectedTab, setSelectedTab] = useState('overview');
  const [selectedPeriod, setSelectedPeriod] = useState('last-30-days');
  const [dateRange, setDateRange] = useState(new Date());

  const getStatusColor = (status) => {
    switch (status) {
      case 'published': return 'var(--color-resilience)';
      case 'ready': return 'var(--color-trust)';
      case 'draft': return '#F77F00';
      default: return 'gray';
    }
  };

  const getStatusBadgeVariant = (status) => {
    if (status === 'published') return 'default';
    if (status === 'ready') return 'secondary';
    return 'outline';
  };

  const formatFileSize = (size) => size;
  const formatDate = (date) => date.toLocaleDateString();

  const generateReport = (type) => {
    console.log(`Generating ${type} report...`);
    // In a real app, this would trigger report generation
  };

  const downloadReport = (reportId) => {
    console.log(`Downloading report ${reportId}...`);
    // In a real app, this would download the file
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="flex items-center gap-3">
            <FileText className="h-8 w-8" style={{ color: 'var(--color-trust)' }} />
            Reports & Analytics
          </h1>
          <p className="text-muted-foreground">
            Comprehensive reporting and data analytics for disaster response operations
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last-7-days">Last 7 Days</SelectItem>
              <SelectItem value="last-30-days">Last 30 Days</SelectItem>
              <SelectItem value="last-quarter">Last Quarter</SelectItem>
              <SelectItem value="last-year">Last Year</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
          <Button className="gap-2" style={{ backgroundColor: 'var(--color-trust)' }}>
            <Download className="h-4 w-4" />
            Generate Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" 
                 style={{ backgroundColor: 'var(--color-resilience)', opacity: 0.1 }}>
              <CheckCircle className="h-5 w-5" style={{ color: 'var(--color-resilience)' }} />
            </div>
            <div>
              <div className="text-2xl font-bold" style={{ color: 'var(--color-resilience)' }}>
                94%
              </div>
              <div className="text-sm text-muted-foreground">Success Rate</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" 
                 style={{ backgroundColor: 'var(--color-trust)', opacity: 0.1 }}>
              <Clock className="h-5 w-5" style={{ color: 'var(--color-trust)' }} />
            </div>
            <div>
              <div className="text-2xl font-bold" style={{ color: 'var(--color-trust)' }}>
                8.7m
              </div>
              <div className="text-sm text-muted-foreground">Avg Response Time</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" 
                 style={{ backgroundColor: '#F77F00', opacity: 0.1 }}>
              <Activity className="h-5 w-5" style={{ color: '#F77F00' }} />
            </div>
            <div>
              <div className="text-2xl font-bold" style={{ color: '#F77F00' }}>
                142
              </div>
              <div className="text-sm text-muted-foreground">Total Incidents</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" 
                 style={{ backgroundColor: 'var(--color-emergency)', opacity: 0.1 }}>
              <Users className="h-5 w-5" style={{ color: 'var(--color-emergency)' }} />
            </div>
            <div>
              <div className="text-2xl font-bold" style={{ color: 'var(--color-emergency)' }}>
                2,847
              </div>
              <div className="text-sm text-muted-foreground">People Assisted</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
        <TabsList className="grid grid-cols-4 w-full max-w-md">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Response Time Trends</CardTitle>
                <p className="text-sm text-muted-foreground">Average response times vs targets</p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={responseTimeData}>
                    <CartesianGrid strokeDasharray="3,3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="avgTime" 
                      stroke="var(--color-trust)" 
                      strokeWidth={2}
                      name="Avg Response Time (min)"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="target" 
                      stroke="var(--color-emergency)" 
                      strokeWidth={2}
                      strokeDasharray="5,5"
                      name="Target (min)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Incident Distribution</CardTitle>
                <p className="text-sm text-muted-foreground">Types of incidents handled</p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={incidentTypesData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {incidentTypesData.map((entry, index) => (
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
              <CardTitle>Network Uptime & Throughput</CardTitle>
              <p className="text-sm text-muted-foreground">Weekly network performance metrics</p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={networkUptimeData}>
                  <CartesianGrid strokeDasharray="3,3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="uptime" 
                    stroke="var(--color-resilience)" 
                    strokeWidth={2}
                    name="Uptime (%)"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="throughput" 
                    stroke="var(--color-trust)" 
                    strokeWidth={2}
                    name="Throughput (%)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
                <p className="text-sm text-muted-foreground">Key performance indicators</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Emergency Response Rate</span>
                    <span className="text-sm font-semibold">94.2%</span>
                  </div>
                  <Progress value={94.2} className="h-2" />
                  <div className="text-xs text-muted-foreground mt-1">Target: 90%</div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Network Reliability</span>
                    <span className="text-sm font-semibold">99.7%</span>
                  </div>
                  <Progress value={99.7} className="h-2" />
                  <div className="text-xs text-muted-foreground mt-1">Target: 99.5%</div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Resource Efficiency</span>
                    <span className="text-sm font-semibold">87.3%</span>
                  </div>
                  <Progress value={87.3} className="h-2" />
                  <div className="text-xs text-muted-foreground mt-1">Target: 85%</div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Communication Uptime</span>
                    <span className="text-sm font-semibold">98.9%</span>
                  </div>
                  <Progress value={98.9} className="h-2" />
                  <div className="text-xs text-muted-foreground mt-1">Target: 98%</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Operational Statistics</CardTitle>
                <p className="text-sm text-muted-foreground">Recent operational data</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="p-4 rounded-lg bg-muted/20">
                    <div className="text-2xl font-bold" style={{ color: 'var(--color-trust)' }}>
                      847
                    </div>
                    <div className="text-sm text-muted-foreground">Missions Completed</div>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/20">
                    <div className="text-2xl font-bold" style={{ color: 'var(--color-resilience)' }}>
                      23
                    </div>
                    <div className="text-sm text-muted-foreground">Teams Deployed</div>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/20">
                    <div className="text-2xl font-bold" style={{ color: '#F77F00' }}>
                      156
                    </div>
                    <div className="text-sm text-muted-foreground">Active Nodes</div>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/20">
                    <div className="text-2xl font-bold" style={{ color: 'var(--color-emergency)' }}>
                      12
                    </div>
                    <div className="text-sm text-muted-foreground">Critical Alerts</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Team Performance Comparison</CardTitle>
              <p className="text-sm text-muted-foreground">Performance metrics by team</p>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3">Team</th>
                      <th className="text-left p-3">Missions</th>
                      <th className="text-left p-3">Success Rate</th>
                      <th className="text-left p-3">Avg Response</th>
                      <th className="text-left p-3">Efficiency</th>
                      <th className="text-left p-3">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { team: 'Alpha Rescue', missions: 45, success: 96, response: '7.2m', efficiency: 92, status: 'Excellent' },
                      { team: 'Medical Bravo', missions: 38, success: 94, response: '8.1m', efficiency: 89, status: 'Good' },
                      { team: 'Logistics Charlie', missions: 67, success: 91, response: '12.4m', efficiency: 87, status: 'Good' },
                      { team: 'Comm Delta', missions: 23, success: 98, response: '5.8m', efficiency: 95, status: 'Excellent' },
                    ].map((team, index) => (
                      <tr key={index} className="border-b hover:bg-muted/50">
                        <td className="p-3 font-medium">{team.team}</td>
                        <td className="p-3">{team.missions}</td>
                        <td className="p-3">{team.success}%</td>
                        <td className="p-3">{team.response}</td>
                        <td className="p-3">{team.efficiency}%</td>
                        <td className="p-3">
                          <Badge variant={team.status === 'Excellent' ? 'default' : 'secondary'}>
                            {team.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resources" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Resource Utilization</CardTitle>
              <p className="text-sm text-muted-foreground">Current resource allocation and usage</p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={resourceData}>
                  <CartesianGrid strokeDasharray="3,3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip />
                  <Bar 
                    dataKey="utilized" 
                    fill="var(--color-trust)"
                    radius={[4, 4, 0, 0]}
                    name="Utilized"
                  />
                  <Bar 
                    dataKey="available" 
                    fill="var(--color-muted)"
                    radius={[4, 4, 0, 0]}
                    name="Available"
                    opacity={0.3}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resourceData.map((resource, index) => (
              <Card key={index}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">{resource.category} Resources</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm">Utilization</span>
                        <span className="font-semibold">{resource.utilized}%</span>
                      </div>
                      <Progress value={resource.utilized} className="h-2" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-muted-foreground">In Use</div>
                        <div className="font-semibold">{resource.utilized}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Available</div>
                        <div className="font-semibold">{resource.available - resource.utilized}</div>
                      </div>
                    </div>

                    <div className="pt-2">
                      <Badge 
                        variant={resource.utilized > 90 ? 'destructive' : resource.utilized > 75 ? 'secondary' : 'default'}
                      >
                        {resource.utilized > 90 ? 'High Usage' : resource.utilized > 75 ? 'Moderate' : 'Optimal'}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Select>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Reports</SelectItem>
                  <SelectItem value="operational">Operational</SelectItem>
                  <SelectItem value="analytics">Analytics</SelectItem>
                  <SelectItem value="compliance">Compliance</SelectItem>
                  <SelectItem value="incident">Incident</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="ready">Ready</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Advanced Filter
              </Button>
              <Button className="gap-2" style={{ backgroundColor: 'var(--color-trust)' }}>
                <FileText className="h-4 w-4" />
                New Report
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {mockReports.map((report) => (
              <Card key={report.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-base">{report.title}</CardTitle>
                      <p className="text-sm text-muted-foreground capitalize">{report.type} Report</p>
                    </div>
                    <Badge variant={getStatusBadgeVariant(report.status)}>
                      {report.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm">{report.description}</p>
                  
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <div className="text-muted-foreground">Period</div>
                      <div className="font-semibold">{report.period}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Size</div>
                      <div className="font-semibold">{report.size}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Generated</div>
                      <div className="font-semibold">{formatDate(report.generatedDate)}</div>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    {report.status === 'ready' || report.status === 'published' ? (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1 gap-1"
                        onClick={() => downloadReport(report.id)}
                      >
                        <Download className="h-3 w-3" />
                        Download
                      </Button>
                    ) : (
                      <Button variant="outline" size="sm" className="flex-1 gap-1" disabled>
                        <Clock className="h-3 w-3" />
                        Generating...
                      </Button>
                    )}
                    <Button variant="ghost" size="sm" className="gap-1">
                      <Eye className="h-3 w-3" />
                      Preview
                    </Button>
                    <Button variant="ghost" size="sm" className="gap-1">
                      <Share className="h-3 w-3" />
                      Share
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Quick Report Generation</CardTitle>
              <p className="text-sm text-muted-foreground">Generate common reports instantly</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Button 
                  variant="outline" 
                  className="h-20 flex flex-col gap-2"
                  onClick={() => generateReport('daily')}
                >
                  <BarChart3 className="h-5 w-5" />
                  <span className="text-sm">Daily Summary</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="h-20 flex flex-col gap-2"
                  onClick={() => generateReport('weekly')}
                >
                  <TrendingUp className="h-5 w-5" />
                  <span className="text-sm">Weekly Analysis</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="h-20 flex flex-col gap-2"
                  onClick={() => generateReport('incident')}
                >
                  <AlertTriangle className="h-5 w-5" />
                  <span className="text-sm">Incident Report</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="h-20 flex flex-col gap-2"
                  onClick={() => generateReport('performance')}
                >
                  <Activity className="h-5 w-5" />
                  <span className="text-sm">Performance</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}