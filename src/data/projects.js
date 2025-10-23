import desktopApp from "../assets/desktopApp.svg";
import solarvideo from "../assets/solar.mp4";
import videoThumbnail from "../assets/solarThumbnail.svg"; // fallback thumbnail
import desktopAppVideo from "../assets/desktopAppVideo.mp4"; // fallback video
import fault from "../assets/Fault.svg"; // fallback image
import faultVideo from "../assets/FaultVideo.mp4";

const projects = [
  {
    name: "Student Management System",
    shortDescription: "A Tkinter based desktop application",
    description: [
      {
        type: "paragraph",
        content:
          "The Student Management System is a Python-based desktop application designed to simplify and streamline attendance tracking, student data handling, and overall academic management for schools and educational institutions.",
      },
      {
        type: "section",
        title: "Features",
        items: [
          "Light/Dark mode toggle for better UX",
          "Clean UI using Tkinter and customtkinter",
          "Easy student info management via CSV files",
        ],
      },
      {
        type: "section",
        title: "Tech Stack",
        content: "Python · Tkinter · customtkinter · CSV",
      },
    ],
    tech: "Python · Tkinter · customtkinter · CSV",
    link: "",
    image: desktopApp,
    video: desktopAppVideo,
    category: "Desktop App",
  },
  {
    name: "Solar Cleaner via Bluetooth",
    shortDescription: "IoT device monitoring system",
    description: [
      {
        type: "paragraph",
        content:
          "Solar Cleaner via Bluetooth is an IoT-based Solar Panel Cleaning System designed to reduce manual effort in maintaining solar panels, particularly in remote or harsh environments.",
      },
      {
        type: "section",
        title: "Key Features",
        items: [
          "Remote cleaning via mobile app using Bluetooth (HC-05)",
          "Monitors dust level, humidity, and other environmental conditions",
          "Motor control for brush and water spray",
          "Real-time feedback on system status",
          "Logs cleaning sessions, performance metrics, and system health",
        ],
      },
      {
        type: "section",
        title: "Methodology",
        items: [
          "Secure Bluetooth interface for mobile control",
          "Arduino-based control unit with integrated sensors",
          "MQTT protocol for lightweight messaging",
          "Field-tested under multiple conditions (15m Bluetooth range)",
        ],
      },
      {
        type: "section",
        title: "Technologies Used",
        content:
          "Python, Arduino, MQTT, Bluetooth (HC-05), Humidity Sensor, Dust Sensor",
      },
      {
        type: "paragraph",
        content:
          "Developed over a 3-month period with collaborative hardware and software effort. Deployed in a university lab for live demo. Future improvements include Wi-Fi support and automatic triggering based on sensor thresholds.",
      },
    ],
    tech: "Python, Arduino, MQTT, Bluetooth (HC-05), Humidity Sensor, Dust Sensor",
    link: "",
    image: "",
    video: solarvideo,
    category: "IoT",
  },
  {
    name: "Fault Detection System",
    shortDescription: "Real-time fault detection system",
    description: [
      {
        type: "paragraph",
        content:
          "A completed system designed to detect faults in single, double, and three-phase lines. When a fault occurs and wires come into contact, the system automatically trips and displays the fault type and location on both an LCD screen and a connected Android app.",
      },
      {
        type: "section",
        title: "Core Capabilities",
        items: [
          "Real-time fault detection and automatic tripping",
          "Supports single to three-phase line monitoring",
          "Fault details displayed on LCD and mobile app",
          "Enhances safety in electrical systems",
        ],
      },
      {
        type: "section",
        title: "Technology Stack",
        content: "Arduino · Android App · Sensors · LCD Display · Relay Module",
      },
    ],
    tech: "Arduino · Android App · Sensors · LCD Display · Relay Module",
    link: "",
    image: fault,
    video: faultVideo,
    category: "IoT",
  },
   
  
];

export default projects;
