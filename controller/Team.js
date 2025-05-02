import db from "../models/index.js";

const createTeam = async (req, res) => {
    const { name, manager_id, members } = req.body;
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
            name,
            manager_id,
        });
        for (let i = 0; i < members.length; i++) {
            // const member = members[i];
            // await db.team_members.create({
            //     team_id: newTeam.id,
            //     user_id: member,
            // });
            try {
                await db.users.update(
                    { team_id: newTeam.id },
                    {
                        where: {
                            id: members[i],
                        },
                    }
                );
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({ message: "Lỗi khi thêm thành viên vào team", error });
            }
        }

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

        const members = await db.users.findAll({
            where: {
                team_id: id,
            },
            attributes: ["id", "username", "fullname"],
        });

        res.status(200).json({ team, members });
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi lấy team", error });
    }
}

export { createTeam, deleteTeam, getAllTeams, getTeamById };