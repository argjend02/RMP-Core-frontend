import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
import Iconify from '../components/iconify';
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from '../sections/@dashboard/app';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// ----------------------------------------------------------------------


export default function DashboardAppPage() {
  const theme = useTheme();
  const [universityCount, setUniversityCount] = useState(0);
  const [studentCount, setStudentCount] = useState(0);
  const [departmentCount, setDepartmentCount] = useState(0);
  const [professorCount, setProfessorCount] = useState(0);

  const [newsData, setNewsData] = useState([]);
  const [universitiesData, setUniversitiesData] = useState([]);



  useEffect(() => {
    const fetchData = async () => {
      try {
        const universityCountResponse = await axios.get('http://localhost:44364/api/AdminDashboard/UniversityCount');
        setUniversityCount(universityCountResponse.data);

        const studentCountResponse = await axios.get('http://localhost:44364/api/AdminDashboard/StudentCount');
        setStudentCount(studentCountResponse.data);

        const departmentCountResponse = await axios.get('http://localhost:44364/api/AdminDashboard/DepartmentCount');
        setDepartmentCount(departmentCountResponse.data);

        const professorCountResponse = await axios.get('http://localhost:44364/api/AdminDashboard/ProfessorCount');
        setProfessorCount(professorCountResponse.data);
      } catch (error) {
        console.error('Gabim në marrjen e të dhënave:', error);
      }
    };

    fetchData(); 
  }, []);


  useEffect(() => {
    axios.get('http://localhost:44364/api/GetRecentNewsCount')
      .then(response => {
        setNewsData(response.data); 
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);


  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('http://localhost:44364/api/GetStudents');
        const data = await response.json();

        const universitiesCount = {};
        data.forEach(item => {
          if (universitiesCount[item.universityId]) {
            universitiesCount[item.universityId]++;
          } else {
            universitiesCount[item.universityId] = 1;
          }
        });

        const universityNamesPromises = Object.keys(universitiesCount).map(async universityId => {
          const universityResponse = await fetch(`http://localhost:44364/api/GetUniversityById/${universityId}`);
          const universityData = await universityResponse.json();
          return { universityId, universityName: universityData.name, studentCount: universitiesCount[universityId] };
        });

        const universityNamesData = await Promise.all(universityNamesPromises);
        setUniversitiesData(universityNamesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);


  return (
    <>
      <Helmet>
        <title> Dashboard | Admin </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            {/* <AppWidgetSummary title="University Count" total={universityCount} icon={'ant-design:android-filled'} /> */}
            <AppWidgetSummary title="University Count" total={universityCount} icon={'fa-solid:university'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            {/* <AppWidgetSummary title="Student Count" total={studentCount} color="info" icon={'ant-design:apple-filled'} /> */}
            <AppWidgetSummary title="Student Count" total={studentCount} color="info" icon={'mdi:school'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            {/* <AppWidgetSummary title="Department Count" total={departmentCount} color="warning" icon={'ant-design:windows-filled'} /> */}
            <AppWidgetSummary title="Department Count" total={departmentCount} color="warning" icon={'mingcute:department-fill'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            {/* <AppWidgetSummary title="Professor Count" total={professorCount} color="error" icon={'ant-design:bug-filled'} /> */}
            <AppWidgetSummary title="Professor Count" total={professorCount} color="error" icon={'game-icons:teacher'} />
          </Grid>


          <Grid item xs={12} md={6} lg={8}>
      <AppWebsiteVisits
        title="Some Statistics For News"
        subheader="Count of news"
        chartLabels={newsData.map(entry => entry.date)}
        chartData={[
          {
            name: 'News',
            type: 'area',
            fill: 'gradient',
            data: newsData.map(entry => entry.count),
          },
        ]}
      />
    </Grid>


          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="How many students?"
              chartData={[
                { label: 'UP', value: 10000 },
                { label: 'UBT', value: 10000 },
                { label: 'AAB', value: 8000 },
                { label: 'Riinvest', value: 5000 },
              ]}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.info.main,
                theme.palette.warning.main,
                theme.palette.error.main,
                // theme.palette.success.main,
              ]}
            />
          </Grid>


        <Grid item xs={12} md={6} lg={8}>
      <AppConversionRates
        title="Number of students by university"
        subheader="Numri total i studenteve sipas universiteteve te tyre"
        chartData={universitiesData.map(university => ({
          label: university.universityName,
          value: university.studentCount,
        }))}
      />
    </Grid>
    
        </Grid>
      </Container>
    </>
  );
}
