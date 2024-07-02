-- CreateTable
CREATE TABLE "Color" (
    "color_id" SERIAL NOT NULL,
    "template_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "hex_color" TEXT NOT NULL,
    "type_color" TEXT NOT NULL,

    CONSTRAINT "Color_pkey" PRIMARY KEY ("color_id")
);

-- CreateTable
CREATE TABLE "Image" (
    "image_id" SERIAL NOT NULL,
    "template_id" INTEGER NOT NULL,
    "type_image" TEXT NOT NULL,
    "url_image" TEXT NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("image_id")
);

-- CreateTable
CREATE TABLE "Documentation" (
    "documentation_id" SERIAL NOT NULL,
    "project_id" TEXT NOT NULL,
    "swagger_path_file" TEXT NOT NULL,

    CONSTRAINT "Documentation_pkey" PRIMARY KEY ("documentation_id")
);

-- CreateTable
CREATE TABLE "Credential" (
    "credential_id" TEXT NOT NULL,
    "project_id" TEXT NOT NULL,
    "env_name" TEXT NOT NULL,
    "env_content" TEXT NOT NULL,

    CONSTRAINT "Credential_pkey" PRIMARY KEY ("credential_id")
);

-- CreateTable
CREATE TABLE "Template" (
    "template_id" SERIAL NOT NULL,
    "project_id" TEXT NOT NULL,
    "font_family" TEXT NOT NULL,

    CONSTRAINT "Template_pkey" PRIMARY KEY ("template_id")
);

-- CreateTable
CREATE TABLE "Project" (
    "project_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("project_id")
);

-- CreateTable
CREATE TABLE "Participant" (
    "participant_id" SERIAL NOT NULL,
    "project_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "Participant_pkey" PRIMARY KEY ("participant_id")
);

-- CreateTable
CREATE TABLE "Task" (
    "task_id" SERIAL NOT NULL,
    "create_user_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "finish_date" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "project_id" TEXT NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("task_id")
);

-- CreateTable
CREATE TABLE "Responsible" (
    "responsible_id" SERIAL NOT NULL,
    "task_id" INTEGER NOT NULL,
    "participant_id" INTEGER NOT NULL,

    CONSTRAINT "Responsible_pkey" PRIMARY KEY ("responsible_id")
);

-- CreateTable
CREATE TABLE "User" (
    "user_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Profile" (
    "profile_id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "role" TEXT NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("profile_id")
);

-- CreateTable
CREATE TABLE "Access" (
    "profile_id" INTEGER NOT NULL,
    "functionality_id" INTEGER NOT NULL,

    CONSTRAINT "Access_pkey" PRIMARY KEY ("profile_id","functionality_id")
);

-- CreateTable
CREATE TABLE "Functionality" (
    "functionality_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Functionality_pkey" PRIMARY KEY ("functionality_id")
);

-- AddForeignKey
ALTER TABLE "Color" ADD CONSTRAINT "Color_template_id_fkey" FOREIGN KEY ("template_id") REFERENCES "Template"("template_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_template_id_fkey" FOREIGN KEY ("template_id") REFERENCES "Template"("template_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Documentation" ADD CONSTRAINT "Documentation_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Project"("project_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Credential" ADD CONSTRAINT "Credential_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Project"("project_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Template" ADD CONSTRAINT "Template_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Project"("project_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Participant" ADD CONSTRAINT "Participant_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Project"("project_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Participant" ADD CONSTRAINT "Participant_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Project"("project_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_create_user_id_fkey" FOREIGN KEY ("create_user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Responsible" ADD CONSTRAINT "Responsible_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "Task"("task_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Responsible" ADD CONSTRAINT "Responsible_participant_id_fkey" FOREIGN KEY ("participant_id") REFERENCES "Participant"("participant_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Access" ADD CONSTRAINT "Access_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "Profile"("profile_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Access" ADD CONSTRAINT "Access_functionality_id_fkey" FOREIGN KEY ("functionality_id") REFERENCES "Functionality"("functionality_id") ON DELETE RESTRICT ON UPDATE CASCADE;
