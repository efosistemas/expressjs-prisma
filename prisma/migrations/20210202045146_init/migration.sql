-- CreateTable
CREATE TABLE "mensagem" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "descricao" TEXT NOT NULL,
    "celular" TEXT NOT NULL,

    PRIMARY KEY ("id")
);
