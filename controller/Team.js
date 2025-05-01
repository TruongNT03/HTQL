import db from "../models/index.js";

const createTeam = async (req, res) => {
    const { name, manager_id } = req.body;
    try {
        console.log(req.body);
        const team = await db.teams.findOne({
            where: {
                manager_id,
            }
        });
        if (team) {
            return res.status(400).json({ message: "Team đã tồn tại" });
        }
        const newTeam = await db.teams.create({
            ...req.body,
        });

        res.status(201).json({
            message: "Tạo team thành công",
            data: newTeam,
        });
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi tạo team", error });
    }
}


const deleteTeam = async (req, res) => {
    const { id } = req.params;
    try {
        const team = await db.teams.findOne({
            where: {
                id,
            },
        });
        if (!team) {
            return res.status(404).json({ message: "Team không tồn tại" });
        }
        await db.teams.destroy({
            where: {
                id,
            },
        });
        res.status(200).json({ message: "Xóa team thành công" });
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi xóa team", error });
    }
}


const getAllTeams = async (req, res) => {
    try {
        console.log("log1");
        const teams = await db.teams.findAll({
            include: [
              {
                model: db.managers,
                as: "manager", 
                include: [
                  {
                    model: db.users,
                    as: "user",
                    attributes: ["username", "fullname"],
                  },
                ],
              },
            ],
          });
        console.log("log2");
        res.status(200).json({ data: teams });
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi lấy danh sách teams", error });
    }
}


const getTeamById = async (req, res) => {
    const { id } = req.params;
    try {
        const team = await db.teams.findOne({
            where: {
                id,
            },
            include: [
                {
                  model: db.managers,
                  as: "manager", 
                  include: [
                    {
                      model: db.users,
                      as: "user",
                      attributes: ["username", "fullname"],
                    },
                  ],
                },
              ],
        });
        if (!team) {
            return res.status(404).json({ message: "Team không tồn tại" });
        }
        res.status(200).json({ data: team });
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi lấy team", error });
    }
}

export { createTeam, deleteTeam, getAllTeams, getTeamById };