-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "hashedPassword" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tradeMark" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "numChair" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "tradeMark_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vehicles" (
    "id" SERIAL NOT NULL,
    "licensePlate" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "timeIntend" TEXT NOT NULL DEFAULT '22:00',
    "price" INTEGER NOT NULL DEFAULT 500000,
    "date" TIMESTAMP(3) NOT NULL,
    "departure_location" TEXT NOT NULL,
    "destination" TEXT NOT NULL,
    "TradeId" INTEGER NOT NULL,

    CONSTRAINT "vehicles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vehicle_Availabel" (
    "id" SERIAL NOT NULL,
    "licensePlate" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "timeIntend" TEXT NOT NULL DEFAULT '22:00',
    "price" INTEGER NOT NULL DEFAULT 500000,
    "date" TIMESTAMP(3) NOT NULL,
    "departure_location" TEXT NOT NULL,
    "destination" TEXT NOT NULL,
    "TradeId" INTEGER NOT NULL,

    CONSTRAINT "Vehicle_Availabel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ticket" (
    "id" SERIAL NOT NULL,
    "chair" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL DEFAULT 0,
    "vehicleId" INTEGER NOT NULL,
    "isBougth" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "ticket_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "vehicles" ADD CONSTRAINT "vehicles_TradeId_fkey" FOREIGN KEY ("TradeId") REFERENCES "tradeMark"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vehicle_Availabel" ADD CONSTRAINT "Vehicle_Availabel_TradeId_fkey" FOREIGN KEY ("TradeId") REFERENCES "tradeMark"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket" ADD CONSTRAINT "ticket_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle_Availabel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket" ADD CONSTRAINT "ticket_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
