// src/shared/data/diagrams.ts
import type { KeyProject } from "./projects";

interface Diagram {
  /** The Mermaid code string (e.g., 'graph TD...' or 'erDiagram...') */
  diagram?: string | null;
  /** Optional title for the diagram section */
  title?: string | null;
  /** Optional unique ID for the diagram (needed for download btn) */
  id?: string; 

  notes?: string[] | null;
}

export interface AllDiagram {
  c4_model: Diagram | null;
  der: Diagram | null;
  /** List of extra flows or diagrams */
  others: Diagram[] | null; 
}


export const DIAGRAMS: Record<KeyProject, AllDiagram> = {
  'mara_sem': {
    c4_model: {
      diagram: `
        C4Container
          %% Actors
          Person(user, "User / Caregiver / Admin", "Authenticated actor assuming different roles.")
          System_Ext(googleMaps, "Google Maps API", "External Geolocation Service")

          System_Boundary(device, "Mobile Device") {
            Container(mobileApp, "Mobile App", "React Native, Expo, TypeScript", "Main client of the vault. Handles camera, audio, and file management.")
          }

          System_Boundary(docker_env, "Docker Environment") {
            Container(nginx, "Reverse Proxy", "Nginx", "Single entry point. Serves static assets for Web Client and routes to the backend.")

            Container(api, "REST API", "Java, Spring Boot, Spring Security", "Modular monolith handling business logic.")

            Container(webApp, "Web Client", "TypeScript, React, Tailwind CSS", "Web client to consume public share links.")

            ContainerDb(postgres, "PostgreSQL", "SQL DB", "Main persistent storage.")

            ContainerDb(files, "File Storage", "Docker Volume / Filesystem", "Physical storage of uploaded files (images, audio, videos).")
          }

          %% Flows 
          Rel(user, mobileApp, "Uses", "HTTPS")
          Rel(mobileApp, nginx, "Consumes API", "HTTPS/JSON")
      
          Rel(nginx, webApp, "Serves static files", "HTTP")
          Rel(nginx, api, "Routes /api/*", "HTTP/JSON")
          
          Rel(api, postgres, "Reads/Writes", "JDBC/Hibernate")
          Rel(api, files, "Reads/Writes", "Filesystem I/O")
          
          Rel(api, googleMaps, "Resolves addresses/coords", "HTTPS")

          %% Styles
          UpdateRelStyle(user, mobileApp, $offsetX="8", $offsetY="-35")
          UpdateRelStyle(mobileApp, nginx, $offsetX="8", $offsetY="-20")

          UpdateRelStyle(nginx, webApp, $offsetX="8", $offsetY="-10")
          UpdateRelStyle(nginx, api, $offsetX="-32", $offsetY="15")

          UpdateRelStyle(api, postgres, $offsetX="8", $offsetY="-10")
          UpdateRelStyle(api, files, $offsetX="8", $offsetY="-10")

          UpdateRelStyle(api, googleMaps, $offsetX="8", $offsetY="-20")

          %% UpdateRelStyle(nginx, api, $textColor="red", $lineColor="red", $offsetX="100", $offsetY="150")
          %% UpdateElementStyle(googleMaps, $borderColor="red")
          UpdateLayoutConfig($c4ShapeInRow="3", $c4BoundaryInRow="1")
      `,
      notes: [
        "User (Protected): Owner of the digital vault. Stores files and defines caregivers.",
        "Caregiver: Trusted contact authorized to receive alerts or view resources.",
        "Admin: System administrator.",
        "",
        "Modules (Java): Auth/Users, Contacts, StoredFiles, CaregiverLinks, ShareLinks, Geo."
      ]
    },
    der: {
      diagram: `
        erDiagram
          USER ||--o{ CONTACT : "owns"
          USER ||--o{ STORED_FILES : "uploads"
          USER ||--o{ CAREGIVER_LINK : "acts as protected user"
          USER ||--o{ CAREGIVER_LINK : "acts as caregiver"
          USER ||--o{ SHARE_LINK : "creates"

          USER {
              uuid id PK
              string email UK
              string password
              string dni UK
          }

          CONTACT {
              long id PK
              string email UK
              uuid user_id FK
          }

          STORED_FILES {
              long id PK
              string storedName UK
              ENUM type_file
              string relativePath
              uuid user_id FK
          }

          CAREGIVER_LINK {
              uuid id PK
              uuid protected_id FK
              uuid caregiver_id FK
              ENUM status 
              uuid revoked_by FK
          }

          SHARE_LINK {
              uuid id PK
              uuid owner_id FK
              ENUM status
              ENUM visibility
              string file_types
              uuid revoked_by FK
          }
      `,
      notes: [
        `STORED_FILES Enum type_file: "AUDIO | IMAGE | VIDEO | TEXT | DOCUMENT | OTHER"`,
        `CAREGIVER_LINK Enum Status: "PENDING | ACCEPTED | REVOKED"`,
        `SHARE_LINK Enum Status: "ACTIVE | REVOKED | EXPIRED"`,
        `SHARE_LINK Enum visibility: "PUBLIC | AUTHENTICATED | CAREGIVERS_ONLY"`,
      ],
    },
    others: [],
  },

  'ecommerce_net': {
    c4_model: {
      diagram: `
        C4Container
          Person(user, "User / Admin", "Customer browsing products or admin managing the store.")
          System_Ext(mercadoPago, "Mercado Pago API", "External Payment Gateway")

          System_Boundary(server, "Docker Compose Environment") {
            Container(nginx, "Reverse Proxy", "Nginx", "Serves static assets (React SPA) and routes /api traffic to the backend.")

            Container(api, "ASP.NET Core API", "C# / .NET, Modular Monolith (Onion)", "Handles business logic, auth, and data access.")

            ContainerDb(redis, "In-Memory Cache", "Redis", "Session state and query caching.")

            Container(spa, "React SPA", "React, TypeScript, Vite", "Customer-facing interface and Admin panel.")

            ContainerDb(postgres, "PostgreSQL", "DB SQL", "Main persistent storage.")

            ContainerDb(files, "File Storage", "Docker Volume", "Physical storage of uploaded images.")
          }

          %% Flujos
          Rel(user, nginx, "Accesses app", "HTTPS")
          
          Rel(nginx, spa, "Serves static files", "HTTP")
          Rel(nginx, api, "Routes /api/*", "HTTP/JSON")
          
          Rel(api, mercadoPago, "Processes payments", "HTTPS")
          Rel(api, redis, "Reads/Writes cache", "TCP")

          Rel(api, postgres, "Reads/Writes data", "EF Core / TCP")
          Rel(api, files, "Reads/Writes", "Filesystem I/O")
          
          %% Styles
          UpdateRelStyle(user, nginx, $offsetX="4", $offsetY="5")
          UpdateRelStyle(nginx, spa, $offsetX="4", $offsetY="-10")
          UpdateRelStyle(nginx, api, $offsetX="-30", $offsetY="10")

          UpdateRelStyle(api, mercadoPago, $offsetX="4", $offsetY="-10")
          UpdateRelStyle(api, redis, $offsetX="-35", $offsetY="10")

          UpdateRelStyle(api, postgres, $offsetX="4", $offsetY="-10")
          UpdateRelStyle(api, files, $offsetX="1", $offsetY="-10")

          UpdateElementStyle(mercadoPago, $borderColor="blue")
          UpdateLayoutConfig($c4ShapeInRow="3", $c4BoundaryInRow="1")
      `,
      notes: [
        "User: Customer browsing products",
        "Admin: System administrator.",
        "",
        "Modules (.NET): Users, Products, Cart, Orders, Payments, AdminPanel."
      ]
      
    },
    der: {
      diagram: `
        erDiagram
          %% User and Cart Relationships
          USER ||--o{ CART : "owns"
          USER ||--o{ ORDER : "places"
          CART ||--|{ CART_ITEM : "contains"
          ORDER ||--|{ ORDER_ITEM : "contains"

          %% Order and Payment Relationships
          VARIANT ||--o{ ORDER_ITEM : "is purchased in"
          ORDER ||--o| PAYMENT : "has"
          VARIANT ||--o{ CART_ITEM : "is added to"

          %% Catalog Relationships
          BRAND ||--o{ PRODUCT : "has"
          CATEGORY ||--o{ CATEGORY : "has subcategories"
          CATEGORY ||--o{ PRODUCT : "categorizes"
          PRODUCT ||--|{ VARIANT : "has"

          %% Table Definitions
          USER {
              int id PK
              string name
              string email UK
              string password
          }

          CATEGORY {
              int id PK
              string name
              string slug UK
              int parent_id FK
          }

          BRAND {
              int id PK
              string name
              string slug UK
          }

          PRODUCT {
              int id PK
              string name
              string slug UK
              int category_id FK
              int brand_id FK
          }

          VARIANT {
              int id PK
              int product_id FK
              string sku UK
              decimal price
              int stock
              string size
              string color
          }

          CART {
              int id PK
              int user_id FK
          }

          CART_ITEM {
              int id PK
              int cart_id FK
              int variant_id FK
              int quantity
              decimal price_at_time
          }

          ORDER {
              int id PK
              int user_id FK
              ENUM status
              decimal total_amount
              datetime created_at
          }

          ORDER_ITEM {
              int id PK
              int order_id FK
              int variant_id FK
              int quantity
              decimal price_at_time
              ENUM status
          }

          PAYMENT {
              int id PK
              int order_id FK
              string transaction_id UK
              decimal amount
              ENUM status
          }
      `,
      notes: [
        `ORDER Enum Status: "PENDING | PAID | SHIPPED | DELIVERED | CANCELED"`,
        `ORDER_ITEM Enum Status: "PENDING | PAID | SHIPPED | DELIVERED | CANCELED"`,
        `PAYMENT Enum Status: "PENDING | APPROVED | REJECTED"`,
      ]
    },
    others: [],
  },

  'fleet_optimizer': {
    c4_model: {
      diagram: `
      C4Container
        %% Users
        Person(client, "Client / Admin / Shipper", "User requesting shipments and tracking.")
        %% Person(admin, "Admin", "Manages fleet, packages, and system config.")
        %% Person(shipper, "Shipper", "Handles package logistics.")
    
        System_Ext(ors, "ORS API", "External Map Routing Service")
        System_Ext(auth0, "Auth0", "OAuth 2.0 / OIDC Provider")

        System_Boundary(system, "Logistics & Fleet Management System") {
          Container(frontend, "Frontend SPA", "React, TypeScript, Tailwind", "Client interface for all users.")

          Container(nginx, "Reverse Proxy", "Nginx", "Serves static assets (React SPA) and routes /api traffic to the backend.")
            
          Container(gateway, "API Gateway", "Java, Spring Cloud Gateway", "Single entry point. Validates JWT, propagates user context headers, and routes to microservices.")
            
          Container(ms_auth, "MS Auth", "Java, Spring Boot", "Handles Register/Login/Refresh/Logout via Auth0.")


          ContainerDb(db_fleets, "Fleets DB", "PostgreSQL", "Stores vehicle fleet data.")

          Container(ms_fleets, "MS Fleets", "Java, Spring Boot", "Manages vehicle fleet and availability.")
          
          Container(ms_routes, "MS Routes", "Java, Spring Boot", "Orchestrates shipments, routes, and legs calculation.")

          Container(ms_geo, "MS GeoCoding", "Java, Spring Boot", "Calculates distances via external ORS API.")


          ContainerDb(db_packages, "Packages DB", "PostgreSQL", "Stores package data.")

          Container(ms_packages, "MS Packages", "Java, Spring Boot", "Manages package inventory and origin.")

          ContainerDb(db_routes, "Routes DB", "PostgreSQL", "Stores routes and leg data.")
        }

        %% Flows
        Rel(client, nginx, "Uses", "HTTPS")

        Rel(ms_auth, auth0, "Validates tokens / Manages users", "HTTPS/OIDC")
        Rel(ms_geo, ors, "Fetches distance matrix", "HTTPS")

        Rel(nginx, frontend, "Serves static files", "HTTP")
        Rel(nginx, gateway, "API requests", "HTTPS/JSON")
        Rel(gateway, ms_auth, "Auth requests", "HTTP/JSON")

        Rel(gateway, ms_routes, "Shipment requests", "HTTP/JSON")
        Rel(gateway, ms_packages, "Package requests", "HTTP/JSON")
        Rel(gateway, ms_fleets, "Fleet requests", "HTTP/JSON")

        Rel(ms_routes, ms_geo, "Requests distance calculations", "HTTP/JSON")
        Rel(ms_routes, ms_packages, "Validates packages", "HTTP/JSON")
        Rel(ms_routes, ms_fleets, "Checks vehicle availability", "HTTP/JSON")

        Rel(ms_routes, db_routes, "Reads/Writes", "JDBC")
        Rel(ms_packages, db_packages, "Reads/Writes", "JDBC")
        Rel(ms_fleets, db_fleets, "Reads/Writes", "JDBC")

        %% Styles
        UpdateRelStyle(client, nginx, $offsetX="-20", $offsetY="-40")
        UpdateRelStyle(ms_auth, auth0, $offsetX="8", $offsetY="-20")
        UpdateRelStyle(ms_geo, ors, $offsetX="-80", $offsetY="-110")

        UpdateRelStyle(nginx, frontend, $offsetX="-48", $offsetY="8")
        UpdateRelStyle(nginx, gateway, $offsetX="-40", $offsetY="8")
        UpdateRelStyle(gateway, ms_auth, $offsetX="-40", $offsetY="8")

        UpdateRelStyle(gateway, ms_fleets, $offsetX="-110", $offsetY="-10")
        UpdateRelStyle(gateway, ms_packages, $offsetX="15", $offsetY="-85")
        UpdateRelStyle(gateway, ms_routes, $offsetX="4", $offsetY="-8")

        UpdateRelStyle(ms_routes, ms_geo, $offsetX="-60", $offsetY="28")
        UpdateRelStyle(ms_routes, ms_packages, $offsetX="-10", $offsetY="-8")
        UpdateRelStyle(ms_routes, ms_fleets, $offsetX="-79", $offsetY="24")

        UpdateRelStyle(ms_routes, db_routes, $offsetX="4", $offsetY="-2")
        UpdateRelStyle(ms_packages, db_packages, $offsetX="-36", $offsetY="8")
        UpdateRelStyle(ms_fleets, db_fleets, $offsetX="-36", $offsetY="8")

        UpdateLayoutConfig($c4ShapeInRow="4", $c4BoundaryInRow="1", $c4ShapeMargin="40")
      `,
      notes: [
        "Client: User requesting shipments and tracking.",
        "Admin: Manages fleet, packages, and system config.",
        "Shipper: Handles package logistics.",
        "",
        "Core backend consists of 5 independent microservices (Java & Spring Boot): Auth, Fleets, Routes, GeoCoding, Packages.",
        "Identity is delegated to Auth0 (no local Users table; identities referenced via 'sub' claims)."
      ],
    },
    der: {
      diagram: `
        erDiagram
          CATEGORIES ||--o{ VEHICLES : "categorizes"
          STORES ||--o{ PACKAGES : "owns"
          ROUTES ||--o{ LEGS : "contains"
          VEHICLES ||--o{ LEGS : "assigned to"
          PACKAGES ||--o{ LEGS : "transported in"

          CATEGORIES {
            int id PK
            string name
          }

          VEHICLES {
            bigint id PK
            bigint category_id FK
            string license_plate UK
            decimal max_weight_kg
            decimal max_volume_cbm
            ENUM status
          }

          STORES {
            bigint id PK
            string owner_id "Auth0 sub"
            string name
            string adress
          }

          PACKAGES {
            bigint id PK
            bigint store_id FK
            string owner_id "Auth0 sub"
            ENUM status
            decimal total_weight_kg
          }

          ROUTES {
            bigint id PK
            string owner_id "Auth0 sub"
            ENUM status
            decimal distance_km
            int duration_minutes
          }

          LEGS {
            bigint id PK
            bigint route_id FK
            bigint vehicle_id FK
            bigint package_id FK
            ENUM status
            int sequence
            decimal distance_km
            int duration_minutes
          }
      `,
      notes: [
        `PACKAGES Enum Status: "CREATED | PROCESSING | READY_FOR_PICKUP | IN_TRANSIT | DELIVERED | ON_HOLD | CANCELLED"`,
        `VEHICLES Enum Status: "AVAILABLE | IN_TRANSIT | MAINTENANCE | OUT_OF_SERVICE | RESERVED"`,
        `ROUTES Enum Status: "PLANNED | IN_PROGRESS | COMPLETED | CANCELLED"`,
        `LEGS Enum Status: "PENDING | IN_PROGRESS | COMPLETED | CANCELLED | DELAYED"`,
      ],
    },
    others: [
      {
        diagram: `
          flowchart TD
            %% Users
            subgraph Users ["Users & Roles"]
                Client["Client"]
                Admin["Admin"]
                Shipper["Shipper"]
            end

            %% Frontend & Gateway
            subgraph Entry ["Entry Point"]
                Frontend["Client Interface FrontEnd<br/><i>(React / TypeScript)</i>"]
                Gateway["API Gateway<br/><i>(Java / Spring Cloud)</i><br/>Validate JWT + propagate headers"]
            end

            %% Core System
            subgraph System ["Logistics & Fleet Management System"]
                MS_Auth["MS Auth<br/><i>(Java / Spring Boot)</i><br/>Register / Login / Refresh / Logout (via Auth0)"]
                MS_Routes["MS Routes<br/><i>(Java / Spring Boot)</i><br/>Manages shipments, routes & legs"]
                MS_Geo["MS GeoCoding<br/><i>(Java / Spring Boot)</i><br/>Calculates distances"]
                MS_Packages["MS Packages<br/><i>(Java / Spring Boot)</i><br/>Package inventory & origin"]
                MS_Fleets["MS Fleets<br/><i>(Java / Spring Boot)</i><br/>Vehicle fleet management"]
            end

            %% External Services
            subgraph External ["External Services"]
                Auth0["Auth0<br/><i>(OAuth 2.0 / OIDC)</i>"]
                ORS["ORS API<br/><i>(External Map Service)</i>"]
            end

            %% Databases
            subgraph Databases ["Persistence Layer"]
                DB_Routes[("Routes DB<br/><i>PostgreSQL</i>")]
                DB_Packages[("Packages DB<br/><i>PostgreSQL</i>")]
                DB_Fleets[("Fleets DB<br/><i>PostgreSQL</i>")]
            end

            %% Flow Relationships
            Client & Admin & Shipper -->|Uses HTTPS| Frontend
            Frontend -->|API Requests| Gateway

            Gateway -->|Auth Requests| MS_Auth
            Gateway -->|Shipment Requests| MS_Routes
            Gateway -->|Package Requests| MS_Packages
            Gateway -->|Fleet Requests| MS_Fleets

            MS_Auth <-->|OAuth 2.0 / Token Validations| Auth0

            MS_Routes -->|Distance Queries| MS_Geo
            MS_Routes <-->|Package Validation| MS_Packages
            MS_Routes <-->|Vehicle Availability| MS_Fleets

            MS_Geo -->|Distance Matrix| ORS

            MS_Routes <-->|Reads / Writes| DB_Routes
            MS_Packages <-->|Reads / Writes| DB_Packages
            MS_Fleets <-->|Reads / Writes| DB_Fleets
        `
      }
    ],
  },

  'dds_tutor': {
    c4_model: null,
    der: null,
    others: [],
  },

  'portfolio': {
    c4_model: null,
    der: null,
    others: [],
  },

  'ecommerce_dj': {
    c4_model: {
      diagram: `
      C4Container
        Person(user, "User / Admin", "Customer browsing products or admin managing the store.")

        System_Ext(mercadoPago, "Mercado Pago API", "External Payment Gateway")

        System_Boundary(server, "Docker Compose Environment") {
          Container(nginx, "Reverse Proxy & Load Balancer", "Nginx", "Serves static files, routes /api traffic, and load balances requests across Django replicas.")

          Container(api, "Django API (x3 replicas)", "Python, Django, Gunicorn", "Handles business logic, auth, and data access. Replicated with Gunicorn workers for concurrency.")
         
          ContainerDb(redis, "Redis", "In-Memory Cache", "Query caching and session state.")
            
          Container(spa, "Frontend (SSR & CSR)", "Django Templates, JavaScript, AJAX", "Server-side rendered views with light client-side interactivity.")

          ContainerDb(postgres, "PostgreSQL", "Relational Database", "Main persistent storage.")

          ContainerDb(files, "File Storage", "Docker Volume", "Physical storage of uploaded images.")
        }

        %% Flujos
        Rel(user, nginx, "Accesses app", "HTTPS")
        
        Rel(nginx, spa, "Serves SSR pages & static files", "HTTP")
        Rel(nginx, api, "Load Balanced", "HTTP/JSON")
        
        Rel(spa, api, "Makes AJAX requests", "HTTPS/JSON")
        Rel(api, mercadoPago, "Processes payments", "HTTPS")
        Rel(api, redis, "Reads/Writes cache", "TCP")
        
        Rel(api, postgres, "Reads/Writes data", "Django ORM / TCP")
        Rel(api, files, "Reads/Writes", "Filesystem I/O")

        UpdateRelStyle(user, nginx, $offsetX="4", $offsetY="4")

        UpdateRelStyle(nginx, spa, $offsetX="-120", $offsetY="-8")

        UpdateRelStyle(nginx, api, $offsetX="-35", $offsetY="8")
        UpdateRelStyle(api, redis, $offsetX="-35", $offsetY="8")
        UpdateRelStyle(api, mercadoPago, $offsetX="4", $offsetY="-8")

        UpdateRelStyle(api, postgres, $offsetX="4", $offsetY="-12")
        UpdateRelStyle(api, files, $offsetX="0", $offsetY="-12")
        

        UpdateLayoutConfig($c4ShapeInRow="3", $c4BoundaryInRow="1")
      `
    },
    der: {
      diagram: `
        erDiagram
          %% User and Cart Relationships
          USER ||--o{ CART : "owns"
          USER ||--o{ ORDER : "places"
          CART ||--|{ CART_ITEM : "contains"
          ORDER ||--|{ ORDER_ITEM : "contains"

          %% Order and Payment Relationships
          PRODUCT ||--o{ ORDER_ITEM : "is purchased in"
          ORDER ||--o| PAYMENT : "has"
          PRODUCT ||--o{ CART_ITEM : "is added to"

          %% Catalog Relationships
          BRAND ||--o{ PRODUCT : "has"
          CATEGORY ||--o{ SUBCATEGORY : "has"
          CATEGORY ||--o{ PRODUCT : "categorizes"
          SUBCATEGORY ||--o{ PRODUCT : "categorizes"

          %% Table Definitions
          USER {
              int id PK
              string email UK
              string password
          }

          CATEGORY {
              int id PK
              string name
              string slug UK
          }

          SUBCATEGORY {
              int id PK
              string name
              string slug UK
              int parent_id FK
          }

          BRAND {
              int id PK
              string name
              string slug UK
          }

          PRODUCT {
              int id PK
              string name
              int category_id FK
              int brand_id FK
          }

          CART {
              int id PK
              int user_id FK
          }

          CART_ITEM {
              int id PK
              int cart_id FK
              int variant_id FK
              int quantity
              decimal price_at_time
          }

          ORDER {
              int id PK
              int user_id FK
              ENUM status
              decimal total_amount
              datetime created_at
          }

          ORDER_ITEM {
              int id PK
              int order_id FK
              int variant_id FK
              int quantity
              decimal price_at_time
              ENUM status
          }

          PAYMENT {
              int id PK
              int order_id FK
              string transaction_id UK
              decimal amount
              ENUM status
          }
      `,
      notes: [
        `ORDER Enum Status: "PENDING | PAID | SHIPPED | DELIVERED | CANCELED"`,
        `ORDER_ITEM Enum Status: "PENDING | PAID | SHIPPED | DELIVERED | CANCELED"`,
        `PAYMENT Enum Status: "PENDING | APPROVED | REJECTED"`,
        `Note on the model: Unlike the .NET version, this schema maintains CATEGORY and SUBCATEGORY as 
        separate tables and does not include a VARIANT entity. This was an early design decision that 
        later evolved into a self-referential relationship and a more robust model for variants.`
      ]
    },
    others: [],
  },

  'backend_tp': {
    c4_model: null,
    der: null,
    others: [],
  },

  'no_country': {
    c4_model: null,
    der: null,
    others: [],
  },

  'py_tutor': {
    c4_model: null,
    der: null,
    others: [],
  },

  'university': {
    c4_model: null,
    der: null,
    others: [],
  },

  'pawn_cs': {
    c4_model: null,
    der: null,
    others: [],
  },
};