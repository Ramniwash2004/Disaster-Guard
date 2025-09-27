import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Brain, 
  TrendingUp, 
  AlertTriangle, 
  Target, 
  Zap, 
  MapPin,
  Clock,
  Activity,
  BarChart3,
  Network,
  Route,
  Shield,
  Lightbulb,
  Eye,
  Cpu,
  RefreshCw
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadialBarChart, RadialBar, ScatterChart, Scatter } from 'recharts';

const mockPredictions = [
  {
    id: 'P001',
    type: 'flood',
    title: 'High Flood Risk - Sector 12',
    description: 'ML models predict 85% chance of flooding in next 6 hours based on rainfall patterns and soil saturation.',
    confidence: 85,
    severity: 'high',
    timeframe: '6 hours',
    impact: 'Critical infrastructure at risk',
    recommendations: [
      'Deploy flood barriers immediately',
      'Evacuate low-lying areas',
      'Pre-position rescue teams',
      'Activate backup power systems'
    ],
    lastUpdated: new Date(Date.now() - 1000 * 60 * 5)
  },
  {
    id: 'P002',
    type: 'failure',
    title: 'Node Failure Prediction',
    description: 'Anomaly detection indicates Node N007 showing degraded performance patterns.',
    confidence: 72,
    severity: 'medium',
    timeframe: '2-4 hours',
    impact: 'Potential communication gap',
    recommendations: [
      'Schedule preventive maintenance',
      'Prepare backup node deployment',
      'Monitor battery levels closely',
      'Check antenna connections'
    ],
    lastUpdated: new Date(Date.now() - 1000 * 60 * 12)
  },
  {
    id: 'P003',
    type: 'optimization',
    title: 'Rescue Path Optimization',
    description: 'AI suggests alternative route with 30% faster response time to emergency location.',
    confidence: 91,
    severity: 'medium',
    timeframe: 'Immediate',
    impact: 'Improved response efficiency',
    recommendations: [
      'Update GPS routing for all teams',
      'Clear traffic from optimal path',
      'Deploy traffic coordination units',
      'Notify emergency services'
    ],
    lastUpdated: new Date(Date.now() - 1000 * 60 * 8)
  },
  {
    id: 'P004',
    type: 'risk',
    title: 'Secondary Disaster Risk',
    description: 'Pattern analysis indicates increased probability of landslides following current weather conditions.',
    confidence: 67,
    severity: 'high',
    timeframe: '12-24 hours',
    impact: 'Potential access route blockage',
    recommendations: [
      'Monitor geological sensors',
      'Establish alternative routes',
      'Alert engineering teams',
      'Prepare heavy equipment'
    ],
    lastUpdated: new Date(Date.now() - 1000 * 60 * 3)
  }
];

const predictionTrends = [
  { hour: '00:00', accuracy: 89, predictions: 12 },
  { hour: '04:00', accuracy: 92, predictions: 8 },
  { hour: '08:00', accuracy: 87, predictions: 15 },
  { hour: '12:00', accuracy: 94, predictions: 10 },
  { hour: '16:00', accuracy: 91, predictions: 14 },
  { hour: '20:00', accuracy: 88, predictions: 11 },
];

const modelPerformance = [
  { model: 'Flood Prediction', accuracy: 89, confidence: 85 },
  { model: 'Node Failure', accuracy: 92, confidence: 78 },
  { model: 'Path Optimization', accuracy: 94, confidence: 91 },
  { model: 'Risk Assessment', accuracy: 87, confidence: 73 },
];

const resourceOptimization = [
  { resource: 'Medical Teams', current: 65, optimized: 89, improvement: 24 },
  { resource: 'Equipment', current: 72, optimized: 85, improvement: 13 },
  { resource: 'Communication', current: 81, optimized: 94, improvement: 13 },
  { resource: 'Transportation', current: 58, optimized: 78, improvement: 20 },
];

export function AIInsights() {
  const [selectedTab, setSelectedTab] = useState('predictions');
  const [refreshing, setRefreshing] = useState(false);

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'var(--color-emergency)';
      case 'medium': return '#F77F00';
      case 'low': return 'var(--color-resilience)';
      default: return 'gray';
    }
  };

  const getSeverityBadgeVariant = (severity) => {
    if (severity === 'high') return 'destructive';
    if (severity === 'medium') return 'secondary';
    return 'default';
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'flood': return AlertTriangle;
      case 'failure': return Zap;
      case 'optimization': return Target;
      case 'risk': return Shield;
      default: return Brain;
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
    return `${Math.floor(diffHours / 24)}d ago`;
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setRefreshing(false);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="flex items-center gap-3">
            <Brain className="h-8 w-8" style={{ color: 'var(--color-trust)' }} />
            AI Insights & Predictions
          </h1>
          <p className="text-muted-foreground">
            Machine learning-powered analysis and predictive intelligence
          </p>
        </div>
        <Button 
          onClick={handleRefresh}
          disabled={refreshing}
          className="gap-2"
          style={{ backgroundColor: 'var(--color-trust)' }}
        >
          <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
          {refreshing ? 'Updating...' : 'Refresh Models'}
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" 
                 style={{ backgroundColor: 'var(--color-trust)', opacity: 0.1 }}>
              <Brain className="h-5 w-5" style={{ color: 'var(--color-trust)' }} />
            </div>
            <div>
              <div className="text-2xl font-bold" style={{ color: 'var(--color-trust)' }}>
                92%
              </div>
              <div className="text-sm text-muted-foreground">Model Accuracy</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" 
                 style={{ backgroundColor: 'var(--color-emergency)', opacity: 0.1 }}>
              <AlertTriangle className="h-5 w-5" style={{ color: 'var(--color-emergency)' }} />
            </div>
            <div>
              <div className="text-2xl font-bold" style={{ color: 'var(--color-emergency)' }}>
                {mockPredictions.filter(p => p.severity === 'high').length}
              </div>
              <div className="text-sm text-muted-foreground">High Priority Alerts</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" 
                 style={{ backgroundColor: 'var(--color-resilience)', opacity: 0.1 }}>
              <Target className="h-5 w-5" style={{ color: 'var(--color-resilience)' }} />
            </div>
            <div>
              <div className="text-2xl font-bold" style={{ color: 'var(--color-resilience)' }}>
                {mockPredictions.filter(p => p.type === 'optimization').length}
              </div>
              <div className="text-sm text-muted-foreground">Optimizations</div>
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
                18
              </div>
              <div className="text-sm text-muted-foreground">Active Models</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
        <TabsList className="grid grid-cols-4 w-full max-w-md">
          <TabsTrigger value="predictions">Predictions</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="optimization">Optimization</TabsTrigger>
          <TabsTrigger value="models">Models</TabsTrigger>
        </TabsList>

        <TabsContent value="predictions" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {mockPredictions.map((prediction) => {
              const Icon = getTypeIcon(prediction.type);
              
              return (
                <Card key={prediction.id} className="relative overflow-hidden">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center" 
                             style={{ backgroundColor: getSeverityColor(prediction.severity), opacity: 0.1 }}>
                          <Icon className="h-5 w-5" style={{ color: getSeverityColor(prediction.severity) }} />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-base">{prediction.title}</CardTitle>
                          <p className="text-sm text-muted-foreground capitalize">{prediction.type} Analysis</p>
                        </div>
                      </div>
                      <Badge variant={getSeverityBadgeVariant(prediction.severity)}>
                        {prediction.severity}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm">{prediction.description}</p>
                    
                    <div className="space-y-3">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm">Confidence Level</span>
                          <span className="font-semibold">{prediction.confidence}%</span>
                        </div>
                        <Progress value={prediction.confidence} className="h-2" />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="text-muted-foreground">Timeframe</div>
                          <div className="font-semibold">{prediction.timeframe}</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Impact</div>
                          <div className="font-semibold">{prediction.impact}</div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold mb-2">AI Recommendations</h4>
                      <div className="space-y-1">
                        {prediction.recommendations.slice(0, 3).map((rec, index) => (
                          <div key={index} className="flex items-start gap-2 text-xs">
                            <div className="w-1.5 h-1.5 rounded-full mt-1.5" 
                                 style={{ backgroundColor: getSeverityColor(prediction.severity) }}></div>
                            <span>{rec}</span>
                          </div>
                        ))}
                        {prediction.recommendations.length > 3 && (
                          <div className="text-xs text-muted-foreground">
                            +{prediction.recommendations.length - 3} more recommendations
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t">
                      <div className="flex items-center gap-1">
                        <Brain className="h-3 w-3" />
                        <span>AI Analysis</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{formatRelativeTime(prediction.lastUpdated)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Prediction Accuracy Trends</CardTitle>
                <p className="text-sm text-muted-foreground">Model performance over time</p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={predictionTrends}>
                    <CartesianGrid strokeDasharray="3,3" />
                    <XAxis dataKey="hour" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="accuracy" 
                      stroke="var(--color-trust)" 
                      strokeWidth={2}
                      name="Accuracy (%)"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="predictions" 
                      stroke="var(--color-resilience)" 
                      strokeWidth={2}
                      name="Predictions Made"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Model Performance</CardTitle>
                <p className="text-sm text-muted-foreground">Individual model statistics</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {modelPerformance.map((model, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-sm">{model.model}</span>
                        <div className="flex items-center gap-4 text-sm">
                          <span>Accuracy: {model.accuracy}%</span>
                          <span>Confidence: {model.confidence}%</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <Progress value={model.accuracy} className="h-2" />
                        <Progress value={model.confidence} className="h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Real-time Model Status</CardTitle>
              <p className="text-sm text-muted-foreground">Current status of all AI models</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { name: 'Flood Prediction', status: 'active', load: 67 },
                  { name: 'Node Failure', status: 'active', load: 89 },
                  { name: 'Path Optimization', status: 'training', load: 34 },
                  { name: 'Risk Assessment', status: 'active', load: 78 },
                  { name: 'Resource Planning', status: 'idle', load: 12 },
                  { name: 'Weather Analysis', status: 'active', load: 91 },
                  { name: 'Communication Optimization', status: 'active', load: 56 },
                  { name: 'Emergency Response', status: 'active', load: 73 }
                ].map((model, index) => (
                  <Card key={index} className="text-center">
                    <CardContent className="p-4">
                      <div className="w-8 h-8 mx-auto mb-2 rounded-lg flex items-center justify-center" 
                           style={{ backgroundColor: 'var(--color-trust)', opacity: 0.1 }}>
                        <Cpu className="h-4 w-4" style={{ color: 'var(--color-trust)' }} />
                      </div>
                      <h4 className="font-medium text-sm mb-1">{model.name}</h4>
                      <Badge 
                        variant={model.status === 'active' ? 'default' : model.status === 'training' ? 'secondary' : 'outline'}
                        className="text-xs mb-2"
                      >
                        {model.status}
                      </Badge>
                      <div className="text-xs text-muted-foreground">
                        Load: {model.load}%
                      </div>
                      <Progress value={model.load} className="h-1 mt-1" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="optimization" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Resource Optimization Insights</CardTitle>
              <p className="text-sm text-muted-foreground">AI-driven efficiency improvements</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {resourceOptimization.map((resource, index) => (
                  <div key={index} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{resource.resource}</h4>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-muted-foreground">Current: {resource.current}%</span>
                        <span style={{ color: 'var(--color-resilience)' }}>Optimized: {resource.optimized}%</span>
                        <Badge style={{ backgroundColor: 'var(--color-resilience)' }}>
                          +{resource.improvement}%
                        </Badge>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>Current Efficiency</span>
                        <span>Optimized Potential</span>
                      </div>
                      <div className="relative">
                        <Progress value={resource.current} className="h-3" />
                        <Progress 
                          value={resource.optimized} 
                          className="h-3 absolute top-0 opacity-60"
                          style={{ '--progress-background': 'var(--color-resilience)' }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Response Time Optimization</CardTitle>
                <p className="text-sm text-muted-foreground">AI-suggested routing improvements</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/20">
                  <Route className="h-5 w-5" style={{ color: 'var(--color-trust)' }} />
                  <div className="flex-1">
                    <h4 className="font-medium">Primary Route Optimization</h4>
                    <p className="text-sm text-muted-foreground">Reduced average response time by 18 minutes</p>
                  </div>
                  <Badge style={{ backgroundColor: 'var(--color-resilience)' }}>Active</Badge>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/20">
                  <Network className="h-5 w-5" style={{ color: 'var(--color-trust)' }} />
                  <div className="flex-1">
                    <h4 className="font-medium">Dynamic Load Balancing</h4>
                    <p className="text-sm text-muted-foreground">Optimized team deployment across zones</p>
                  </div>
                  <Badge style={{ backgroundColor: 'var(--color-resilience)' }}>Active</Badge>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/20">
                  <Eye className="h-5 w-5" style={{ color: 'var(--color-trust)' }} />
                  <div className="flex-1">
                    <h4 className="font-medium">Predictive Resource Allocation</h4>
                    <p className="text-sm text-muted-foreground">Pre-positioning based on demand forecasts</p>
                  </div>
                  <Badge variant="secondary">Training</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Operational Insights</CardTitle>
                <p className="text-sm text-muted-foreground">Key recommendations from AI analysis</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800">
                  <Lightbulb className="h-5 w-5 mt-0.5" style={{ color: 'var(--color-resilience)' }} />
                  <div>
                    <h4 className="font-medium text-sm">High Impact Opportunity</h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      Implementing dynamic mesh reconfiguration could improve network resilience by 34%
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800">
                  <Target className="h-5 w-5 mt-0.5" style={{ color: 'var(--color-trust)' }} />
                  <div>
                    <h4 className="font-medium text-sm">Efficiency Gain</h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      Predictive maintenance scheduling could reduce equipment downtime by 42%
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800">
                  <AlertTriangle className="h-5 w-5 mt-0.5" style={{ color: '#F77F00' }} />
                  <div>
                    <h4 className="font-medium text-sm">Attention Required</h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      Communication bottlenecks detected in sectors 5-7 during peak operations
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="models" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>AI Model Management</CardTitle>
              <p className="text-sm text-muted-foreground">Monitor and manage all active AI models</p>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3">Model Name</th>
                      <th className="text-left p-3">Type</th>
                      <th className="text-left p-3">Status</th>
                      <th className="text-left p-3">Accuracy</th>
                      <th className="text-left p-3">Last Trained</th>
                      <th className="text-left p-3">CPU Load</th>
                      <th className="text-left p-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: 'Flood Risk Predictor', type: 'Neural Network', status: 'active', accuracy: 89, trained: '2h ago', load: 67 },
                      { name: 'Node Failure Detection', type: 'Random Forest', status: 'active', accuracy: 92, trained: '4h ago', load: 34 },
                      { name: 'Route Optimizer', type: 'Genetic Algorithm', status: 'active', accuracy: 94, trained: '1h ago', load: 89 },
                      { name: 'Risk Assessment', type: 'SVM', status: 'training', accuracy: 87, trained: '30m ago', load: 78 },
                      { name: 'Resource Predictor', type: 'LSTM', status: 'idle', accuracy: 85, trained: '6h ago', load: 12 },
                    ].map((model, index) => (
                      <tr key={index} className="border-b hover:bg-muted/50">
                        <td className="p-3 font-medium">{model.name}</td>
                        <td className="p-3">{model.type}</td>
                        <td className="p-3">
                          <Badge 
                            variant={
                              model.status === 'active' ? 'default' : 
                              model.status === 'training' ? 'secondary' : 'outline'
                            }
                          >
                            {model.status}
                          </Badge>
                        </td>
                        <td className="p-3">{model.accuracy}%</td>
                        <td className="p-3 text-muted-foreground">{model.trained}</td>
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <Progress value={model.load} className="h-2 w-16" />
                            <span className="text-xs">{model.load}%</span>
                          </div>
                        </td>
                        <td className="p-3">
                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                              <Eye className="h-3 w-3" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                              <RefreshCw className="h-3 w-3" />
                            </Button>
                          </div>
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