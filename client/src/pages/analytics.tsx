import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Analytics() {
  const chartData = [
    { country: 'Chad', Hopping: 1800, Nymph: 3200, Fledgling: 1600 },
    { country: 'Sudan', Hopping: 1600, Nymph: 1800, Fledgling: 1700 },
    { country: 'Eritrea', Hopping: 500, Nymph: 600, Fledgling: 2200 },
    { country: 'Ethiopia', Hopping: 3200, Nymph: 1900, Fledgling: 1500 },
    { country: 'Kenya', Hopping: 5200, Nymph: 2800, Fledgling: 1200 },
    { country: 'Uganda', Hopping: 200, Nymph: 300, Fledgling: 100 }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Analysis Dashboard</h1>
          
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Desert Locust Analysis</h2>
            <p className="text-gray-600">Analyze desert locust data across different countries and time periods</p>
          </div>

          <div className="flex items-center space-x-4 mb-6">
            <Select defaultValue="all">
              <SelectTrigger className="w-48">
                <SelectValue placeholder="All Countries" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Countries</SelectItem>
                <SelectItem value="chad">Chad</SelectItem>
                <SelectItem value="sudan">Sudan</SelectItem>
                <SelectItem value="eritrea">Eritrea</SelectItem>
                <SelectItem value="ethiopia">Ethiopia</SelectItem>
                <SelectItem value="kenya">Kenya</SelectItem>
                <SelectItem value="uganda">Uganda</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="2025">
              <SelectTrigger className="w-32">
                <SelectValue placeholder="2025" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2025">2025</SelectItem>
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2023">2023</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="june">
              <SelectTrigger className="w-32">
                <SelectValue placeholder="June" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="june">June</SelectItem>
                <SelectItem value="may">May</SelectItem>
                <SelectItem value="april">April</SelectItem>
                <SelectItem value="march">March</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <FileText className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Infestation Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="country" 
                      angle={-45}
                      textAnchor="end"
                      height={80}
                      fontSize={12}
                    />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Hopping" fill="#FF6B8A" />
                    <Bar dataKey="Nymph" fill="#4FC3F7" />
                    <Bar dataKey="Fledgling" fill="#66BB6A" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-center">Outbreak Risk Assessment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="country" 
                      angle={-45}
                      textAnchor="end"
                      height={80}
                      fontSize={12}
                    />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Hopping" fill="#FF6B8A" />
                    <Bar dataKey="Nymph" fill="#4FC3F7" />
                    <Bar dataKey="Fledgling" fill="#66BB6A" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-center">Habitat Suitability</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="country" 
                      angle={-45}
                      textAnchor="end"
                      height={80}
                      fontSize={12}
                    />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Hopping" fill="#FF6B8A" />
                    <Bar dataKey="Nymph" fill="#4FC3F7" />
                    <Bar dataKey="Fledgling" fill="#66BB6A" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}