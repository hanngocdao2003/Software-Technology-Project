-- CreateTable
CREATE TABLE "CT_Ticket" (
    "id" SERIAL NOT NULL,
    "name_customer" TEXT NOT NULL,
    "email_customer" TEXT NOT NULL,
    "phone_customer" TEXT NOT NULL,
    "ticketId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CT_Ticket_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CT_Ticket" ADD CONSTRAINT "CT_Ticket_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "ticket"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
