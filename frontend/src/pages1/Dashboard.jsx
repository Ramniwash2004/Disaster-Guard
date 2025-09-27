import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/card.jsx';
import { Badge } from '../components/badge.jsx';
import { Button } from '../components/button.jsx';
import { Progress } from '../components/progress.jsx';
// import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  MapPin, 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Wifi, 
  WifiOff,
  Thermometer,
  Droplets,
  Wind,
  Zap,
  Users,
  Package,
  RefreshCw,
  Maximize
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import networkImage from 'figma:asset/3aa5252e31ff4b31e257d35a11117b59bfce36ba.png';

// Network nodes arranged in hexagonal pattern like the provided image
const mockNodes = [
  { id: 'NODE-1', x: 30, y: 20, status: 'active', type: 'primary', battery: 89, location: 'Central Hub', connections: ['NODE-2', 'NODE-3', 'NODE-4', 'NODE-5', 'NODE-6'] },
  { id: 'NODE-2', x: 15, y: 50, status: 'active', type: 'relay', battery: 76, location: 'West Station', connections: ['NODE-1', 'NODE-3', 'NODE-4', 'NODE-5', 'NODE-6'] },
  { id: 'NODE-3', x: 15, y: 80, status: 'warning', type: 'secondary', battery: 45, location: 'Southwest Post', connections: ['NODE-1', 'NODE-2', 'NODE-4', 'NODE-5', 'NODE-6'] },
  { id: 'NODE-4', x: 45, y: 80, status: 'active', type: 'secondary', battery: 92, location: 'Southeast Base', connections: ['NODE-1', 'NODE-2', 'NODE-3', 'NODE-5', 'NODE-6'] },
  { id: 'NODE-5', x: 60, y: 50, status: 'active', type: 'relay', battery: 88, location: 'East Command', connections: ['NODE-1', 'NODE-2', 'NODE-3', 'NODE-4', 'NODE-6'] },
  { id: 'NODE-6', x: 45, y: 20, status: 'inactive', type: 'primary', battery: 12, location: 'North Tower', connections: ['NODE-1', 'NODE-2', 'NODE-3', 'NODE-4', 'NODE-5'] },
];

const networkData = [
  { time: '00:00', throughput: 85, latency: 12, nodes: 156 },
  { time: '04:00', throughput: 92, latency: 8, nodes: 160 },
  { time: '08:00', throughput: 78, latency: 15, nodes: 158 },
  { time: '12:00', throughput: 88, latency: 10, nodes: 162 },
  { time: '16:00', throughput: 95, latency: 7, nodes: 165 },
  { time: '20:00', throughput: 87, latency: 11, nodes: 163 },
];

const alertData = [
  { severity: 'Critical', count: 3, color: 'var(--color-emergency)' },
  { severity: 'Warning', count: 12, color: '#F77F00' },
  { severity: 'Info', count: 25, color: 'var(--color-trust)' },
];

export function Dashboard() {
  const [selectedNode, setSelectedNode] = useState(null);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [weatherExpanded, setWeatherExpanded] = useState(false);

  const getNodeStatusColor = (status) => {
    switch (status) {
      case 'active': return 'var(--color-resilience)';
      case 'warning': return '#F77F00';
      case 'inactive': return 'var(--color-emergency)';
      default: return 'gray';
    }
  };

  const getNodeStatusIcon = (status) => {
    switch (status) {
      case 'active': return <CheckCircle className="h-3 w-3" />;
      case 'warning': return <AlertTriangle className="h-3 w-3" />;
      case 'inactive': return <XCircle className="h-3 w-3" />;
      default: return <Activity className="h-3 w-3" />;
    }
  };

  const getConnectionPath = (node1, node2) => {
    return `M ${node1.x} ${node1.y} L ${node2.x} ${node2.y}`;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Network Status</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" style={{ color: 'var(--color-resilience)' }}>98.2%</div>
            <p className="text-xs text-muted-foreground">
              +2.1% from last hour
            </p>
            <div className="flex items-center mt-2 gap-2">
              <Wifi className="h-4 w-4" style={{ color: 'var(--color-resilience)' }} />
              <span className="text-sm">165 nodes active</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" style={{ color: 'var(--color-emergency)' }}>3</div>
            <p className="text-xs text-muted-foreground">
              Critical incidents
            </p>
            <div className="flex items-center mt-2 gap-2">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--color-emergency)' }}></div>
              <span className="text-sm">Requires immediate attention</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Response Teams</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" style={{ color: 'var(--color-trust)' }}>27</div>
            <p className="text-xs text-muted-foreground">
              Teams deployed
            </p>
            <div className="flex items-center mt-2 gap-2">
              <CheckCircle className="h-4 w-4" style={{ color: 'var(--color-resilience)' }} />
              <span className="text-sm">All teams operational</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resource Status</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" style={{ color: 'var(--color-resilience)' }}>89%</div>
            <p className="text-xs text-muted-foreground">
              Supplies available
            </p>
            <div className="flex items-center mt-2 gap-2">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#F77F00' }}></div>
              <span className="text-sm">Medical supplies low</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Interactive Map */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Global Disaster Monitoring Network</CardTitle>
              <p className="text-sm text-muted-foreground">Geography based traffic and IoT mesh network status</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <RefreshCw className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Maximize className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="relative h-96 bg-background rounded-lg overflow-hidden border">
              {/* Network Topology Background */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-muted-foreground/20 text-6xl font-semibold">
                  MESH NETWORK
                </div>
              </div>

              {/* Connection Lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-5" viewBox="0 0 100 100" preserveAspectRatio="none">
                {mockNodes.map((node) =>
                  node.connections?.map((connectionId) => {
                    const connectedNode = mockNodes.find(n => n.id === connectionId);
                    if (!connectedNode) return null;
                    
                    const isActiveConnection = node.status === 'active' && connectedNode.status === 'active';
                    const isHighlighted = hoveredNode === node.id || hoveredNode === connectionId;
                    
                    return (
                      <line
                        key={`${node.id}-${connectionId}`}
                        x1={node.x}
                        y1={node.y}
                        x2={connectedNode.x}
                        y2={connectedNode.y}
                        stroke={
                          isHighlighted 
                            ? 'var(--color-trust)'
                            : isActiveConnection 
                              ? '#000000' 
                              : node.status === 'inactive' || connectedNode.status === 'inactive' 
                                ? 'var(--color-emergency)' 
                                : '#F77F00'
                        }
                        strokeWidth={isHighlighted ? "0.8" : isActiveConnection ? "0.4" : "0.3"}
                        strokeDasharray={isActiveConnection ? "none" : "1,1"}
                        opacity={isHighlighted ? 0.9 : 0.6}
                        className={isActiveConnection && !isHighlighted ? "animate-pulse" : ""}
                        style={{
                          filter: isHighlighted ? 'drop-shadow(0 0 2px currentColor)' : 'none',
                          transition: 'all 0.3s ease'
                        }}
                      />
                    );
                  })
                )}
              </svg>

              {/* Node Labels */}
              {mockNodes.map((node) => (
                <div
                  key={`label-${node.id}`}
                  className="absolute text-sm font-medium text-foreground pointer-events-none"
                  style={{ 
                    left: `${node.x}%`, 
                    top: `${node.y - 8}%`,
                    transform: 'translateX(-50%)'
                  }}
                >
                  {node.id}
                </div>
              ))}

              {/* IoT Nodes */}
              {mockNodes.map((node) => {
                return (
                  <div
                    key={node.id}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-10"
                    style={{ left: `${node.x}%`, top: `${node.y}%` }}
                    onClick={() => setSelectedNode(selectedNode === node.id ? null : node.id)}
                    onMouseEnter={() => setHoveredNode(node.id)}
                    onMouseLeave={() => setHoveredNode(null)}
                  >
                    <div className="relative">
                      {/* Main Node Circle */}
                      <div 
                        className={`w-8 h-8 rounded-full border-4 border-black shadow-lg transition-all duration-300 ${
                          hoveredNode === node.id ? 'scale-125 shadow-xl' : 'group-hover:scale-110'
                        }`}
                        style={{ 
                          backgroundColor: getNodeStatusColor(node.status),
                          boxShadow: hoveredNode === node.id 
                            ? `0 0 15px ${getNodeStatusColor(node.status)}, 0 0 30px ${getNodeStatusColor(node.status)}40`
                            : '0 4px 8px rgba(0,0,0,0.2)'
                        }}
                      >
                        {node.status === 'active' && (
                          <div className="absolute inset-0 rounded-full animate-pulse opacity-40" 
                               style={{ backgroundColor: getNodeStatusColor(node.status) }}
                          ></div>
                        )}
                        
                        {/* Enhanced glow for hovered nodes */}
                        {hoveredNode === node.id && (
                          <>
                            <div className="absolute inset-0 rounded-full animate-ping opacity-60" 
                                 style={{ backgroundColor: getNodeStatusColor(node.status) }}
                            ></div>
                          </>
                        )}
                      </div>

                      {/* Status Icon Overlay */}
                      <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow-sm">
                        {getNodeStatusIcon(node.status)}
                      </div>
                    </div>
                    
                    {/* Simple Hover Tooltip */}
                    {hoveredNode === node.id && (
                      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 bg-card/95 backdrop-blur-sm border rounded-lg shadow-lg p-3 min-w-48 z-20 transition-opacity">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-sm">{node.location}</span>
                            <Badge variant={node.status === 'active' ? 'default' : node.status === 'warning' ? 'secondary' : 'destructive'} className="text-xs">
                              {node.status}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2">
                            <Zap className="h-3 w-3" style={{ color: getNodeStatusColor(node.status) }} />
                            <span className="text-sm">Battery: {node.battery}%</span>
                            <div className="flex-1">
                              <Progress 
                                value={node.battery} 
                                className="h-1"
                                style={{
                                  '--progress-background': node.battery > 50 ? 'var(--color-resilience)' : 
                                                         node.battery > 25 ? '#F77F00' : 'var(--color-emergency)'
                                }}
                              />
                            </div>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {node.id} • {node.type} node
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Detailed Click Tooltip */}
                    {selectedNode === node.id && (
                      <div className="absolute bottom-14 left-1/2 transform -translate-x-1/2 bg-card border rounded-lg shadow-xl p-4 min-w-64 z-20">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-semibold">{node.id}</div>
                              <div className="text-sm text-muted-foreground">{node.location}</div>
                            </div>
                            <Badge variant={node.status === 'active' ? 'default' : node.status === 'warning' ? 'secondary' : 'destructive'}>
                              {node.status}
                            </Badge>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-3 text-sm">
                            <div>
                              <div className="text-muted-foreground">Type</div>
                              <div className="capitalize">{node.type}</div>
                            </div>
                            <div>
                              <div className="text-muted-foreground">Connections</div>
                              <div>{node.connections?.length || 0}</div>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="flex items-center gap-1">
                                <Zap className="h-3 w-3" />
                                Battery
                              </span>
                              <span>{node.battery}%</span>
                            </div>
                            <Progress 
                              value={node.battery} 
                              className="h-2"
                            />
                          </div>

                          {node.connections && node.connections.length > 0 && (
                            <div className="pt-2 border-t">
                              <div className="text-sm text-muted-foreground mb-1">Connected to:</div>
                              <div className="text-xs text-muted-foreground">
                                {node.connections.map(connId => {
                                  const connNode = mockNodes.find(n => n.id === connId);
                                  return connNode?.location || connId;
                                }).join(', ')}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            
            {/* Network Legend */}
            <div className="mt-4 pt-4 border-t space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full border-2 border-black" style={{ backgroundColor: 'var(--color-resilience)' }}></div>
                    <span>Active Node</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full border-2 border-black" style={{ backgroundColor: '#F77F00' }}></div>
                    <span>Warning Node</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full border-2 border-black" style={{ backgroundColor: 'var(--color-emergency)' }}></div>
                    <span>Inactive Node</span>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  Last updated: {new Date().toLocaleTimeString()}
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <svg width="24" height="4">
                      <line x1="0" y1="2" x2="24" y2="2" stroke="#000000" strokeWidth="2" />
                    </svg>
                    <span>Active Connection</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg width="24" height="4">
                      <line x1="0" y1="2" x2="24" y2="2" stroke="#F77F00" strokeWidth="1" strokeDasharray="3,3" />
                    </svg>
                    <span>Degraded Connection</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs bg-muted px-2 py-1 rounded">Full Mesh</span>
                    <span>Topology: All nodes interconnected</span>
                  </div>
                </div>
                <div className="text-muted-foreground">
                  {mockNodes.filter(n => n.status === 'active').length} active • {mockNodes.filter(n => n.status === 'warning').length} warnings • {mockNodes.filter(n => n.status === 'inactive').length} offline
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Weather & Environmental */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Environmental Status</CardTitle>
              <p className="text-sm text-muted-foreground">Current conditions</p>
            </div>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setWeatherExpanded(!weatherExpanded)}
            >
              <Maximize className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <Thermometer className="h-5 w-5" style={{ color: 'var(--color-emergency)' }} />
                <div>
                  <div className="font-semibold">24°C</div>
                  <div className="text-xs text-muted-foreground">Temperature</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Droplets className="h-5 w-5" style={{ color: 'var(--color-trust)' }} />
                <div>
                  <div className="font-semibold">68%</div>
                  <div className="text-xs text-muted-foreground">Humidity</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Wind className="h-5 w-5" style={{ color: 'var(--color-resilience)' }} />
                <div>
                  <div className="font-semibold">12 mph</div>
                  <div className="text-xs text-muted-foreground">Wind Speed</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-5 w-5" style={{ color: '#F77F00' }} />
                <div>
                  <div className="font-semibold">Moderate</div>
                  <div className="text-xs text-muted-foreground">Risk Level</div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold">Active Weather Alerts</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2 p-2 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
                  <AlertTriangle className="h-4 w-4" style={{ color: '#F77F00' }} />
                  <div className="flex-1">
                    <div className="text-sm font-medium">High Wind Warning</div>
                    <div className="text-xs text-muted-foreground">Gusts up to 35 mph expected</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-2 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                  <Droplets className="h-4 w-4" style={{ color: 'var(--color-trust)' }} />
                  <div className="flex-1">
                    <div className="text-sm font-medium">Flood Watch</div>
                    <div className="text-xs text-muted-foreground">Heavy rainfall in nearby areas</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Network Performance & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Network Performance</CardTitle>
            <p className="text-sm text-muted-foreground">24-hour overview</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={networkData}>
                <CartesianGrid strokeDasharray="3,3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="throughput" 
                  stroke="var(--color-resilience)" 
                  fill="var(--color-resilience)" 
                  fillOpacity={0.2}
                  name="Throughput (%)"
                />
                <Area 
                  type="monotone" 
                  dataKey="latency" 
                  stroke="var(--color-trust)" 
                  fill="var(--color-trust)" 
                  fillOpacity={0.2}
                  name="Latency (ms)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Alert Distribution</CardTitle>
            <p className="text-sm text-muted-foreground">Current alert status</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={alertData}>
                <CartesianGrid strokeDasharray="3,3" />
                <XAxis dataKey="severity" />
                <YAxis />
                <Tooltip />
                <Bar 
                  dataKey="count" 
                  fill="var(--color-chart-1)"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
            
            <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t">
              {alertData.map((alert, index) => (
                <div key={index} className="text-center">
                  <div className="text-lg font-semibold" style={{ color: alert.color }}>
                    {alert.count}
                  </div>
                  <div className="text-xs text-muted-foreground">{alert.severity}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}